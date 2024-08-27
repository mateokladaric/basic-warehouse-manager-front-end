import { item } from "../App";

export default function Home({displayItems}: {displayItems:item[]}) {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      {displayItems.map((item) => {
        return(
          <div key={Math.random() * 999999}>
            <h1>{item.name}</h1>
            <h2>{item.price}€</h2>
            <h4>In Stock: {item.count}</h4>
          </div>
        )
      })}
    </div>
  );
}