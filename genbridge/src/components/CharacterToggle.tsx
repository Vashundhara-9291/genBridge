import React from 'react';

const characterTypes = [
  { id: 'cat', label: 'Cat' },
  { id: 'dog', label: 'Dog' },
];

const CharacterToggle = ({ selectedCharacter, onCharacterChange }) => {
  return (
    <div>
      <h3>Select Character</h3>
      {characterTypes.map((character) => (
        <label key={character.id}>
          <input
            type="radio"
            value={character.id}
            checked={selectedCharacter === character.id}
            onChange={() => onCharacterChange(character.id)}
          />
          {character.label}
        </label>
      ))}
    </div>
  );
};

export default CharacterToggle;