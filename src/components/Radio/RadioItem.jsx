import "./Radio.css";

export default function RadioItem({ filterName, ...props }) {
  return (
    <label className="radio">
      <input type="radio" name="radio" {...props} />
      <span className="name">{filterName}</span>
    </label>
  )
}
