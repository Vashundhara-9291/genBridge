export interface CursorSettings {
  characterType: 'cat' | 'dog';
  size: number;
  learningMode: boolean;
}

export interface CharacterProps {
  characterType: 'cat' | 'dog';
  size: number;
  isHovered: boolean;
}