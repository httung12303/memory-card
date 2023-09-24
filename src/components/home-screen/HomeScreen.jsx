import PokemonLogo from '../../assets/img/logo.png';

export default function HomeScreen({ onRegionClick }) {
  const regions = [
    'Kanto',
    'Johto',
    'Hoenn',
    'Sinnoh',
    'Unova',
    'Kalos',
    'Alola',
    'Galar',
  ];
  return (
    <div className="home-screen">
      <h1 className="title">
        <img src={PokemonLogo} alt="" />
        <div className='sub-title'>Memory cards</div>
      </h1>
      <div className='choose'>Choose a region</div>
      <div className="region-container">
        {regions.map((region, index) => (
          <button
            type="button"
            key={index + 1}
            onClick={() => onRegionClick(index + 1)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
}
