export default function PokemonCard({ id, name, sprite_url, onCardClick }) {
  return (
    <button
      type="button"
      className="pokemon-card"
      onClick={() => onCardClick(id)}
    >
      <img src={sprite_url} alt="" />
      <span>{name.slice(0, 1).toUpperCase() + name.slice(1)}</span>
    </button>
  );
}
