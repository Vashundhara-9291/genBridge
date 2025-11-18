import { useEffect, useRef, useState } from 'react'
import styles from './CursorEffect.module.css'

export default function CursorEffect({
  character = 'cat',
  enabled = true,
  learningMode = false,
  size = 'medium'
}) {
        const cursorRef = useRef(null)
        const [cursorState, setCursorState] = useState('normal')
        const [isHovering, setIsHovering] = useState(false)
        const [hoverElement, setHoverElement] = useState(null)

        useEffect(() => {
          if (!enabled) return

          const cursor = cursorRef.current
          if (!cursor) return

          let rafId
          let targetX = 0,
            targetY = 0
          let currentX = 0,
            currentY = 0

          const update = () => {
            const dx = targetX - currentX
            const dy = targetY - currentY
            currentX += dx * 0.12
            currentY += dy * 0.12

            if (cursor) {
              cursor.style.transform = `translate(${currentX - 16}px, ${currentY - 16}px)`
            }
            rafId = requestAnimationFrame(update)
          }

          const onMove = (e) => {
            targetX = e.clientX
            targetY = e.clientY
          }

          const onOver = (e) => {
            if (!(e.target instanceof Element)) return

            const element = e.target
            const isInteractive = element.closest(
              'a, button, [role="button"], input, select, textarea, .card, .learning-element, .game-element, .story-element'
            )

            if (isInteractive) {
              setIsHovering(true)
              setHoverElement(element)

              if (element.closest('.learning-element, .study-section')) {
                setCursorState('learning')
              } else if (element.closest('.game-element, .game-zone')) {
                setCursorState('game')
              } else if (element.closest('.story-element, .story-section')) {
                setCursorState('story')
              } else if (element.closest('button')) {
                setCursorState('button')
              } else if (element.closest('a')) {
                setCursorState('link')
              } else {
                setCursorState('hover')
              }
            } else {
              setIsHovering(false)
              setHoverElement(null)
              setCursorState('normal')
            }
          }

          const onClick = () => {
            setCursorState('click')
            setTimeout(() => {
              if (isHovering) {
                onOver({ target: hoverElement })
              } else {
                setCursorState('normal')
              }
            }, 200)
          }

          const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
          if (isTouchDevice) return

          window.addEventListener('mousemove', onMove)
          window.addEventListener('mouseover', onOver)
          window.addEventListener('click', onClick)
          rafId = requestAnimationFrame(update)

          return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseover', onOver)
            window.removeEventListener('click', onClick)
            cancelAnimationFrame(rafId)
          }
        }, [enabled, isHovering, hoverElement])

        if (!enabled) return null

        const cursorClasses = [
          styles.cursor,
          styles[character],
          styles[size],
          styles[cursorState],
          learningMode ? styles.learningMode : '',
          isHovering ? styles.hovering : ''
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <div ref={cursorRef} className={cursorClasses} style={{ pointerEvents: 'none' }} aria-hidden="true">
            <div className={styles.characterWrap}>
              <div className={styles.character}>{character === 'cat' ? '🐱' : '🐶'}</div>
              <div className={styles.earLeft} aria-hidden="true" />
              <div className={styles.earRight} aria-hidden="true" />
              <div className={styles.tail} aria-hidden="true" />
            </div>

            {cursorState === 'learning' && <div className={styles.tool}>🔍</div>}
            {cursorState === 'game' && <div className={styles.tool}>⚽</div>}
            {cursorState === 'story' && <div className={styles.tool}>📖</div>}
          </div>
        )
      }


