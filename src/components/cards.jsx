export default function Card({ item, onFavorite }) {
  const image = item.thumbnail?.path + "." + item.thumbnail?.extension;

  return (
    <div className="card">
      {image && <img src={image} alt={item.name || item.title} />}
      <h3>{item.name || item.title}</h3>
      <p>{item.description || "Pas de description."}</p>
      {onFavorite && (
        <button onClick={() => onFavorite(item)}>⭐ Ajouter aux favoris</button>
      )}
    </div>
  );
}
