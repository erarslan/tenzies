export default function Dice({ value, isHeld, holdDice }) {
  return (
    <div
      className="dice"
      style={{ backgroundColor: isHeld ? "#59E391" : "white" }}
      onClick={holdDice}
    >
      {value}
    </div>
  );
}
