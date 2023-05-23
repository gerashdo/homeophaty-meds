import './pill.css'

export const Pill = ({ text, color }) => {
  return (
    <div className={`pill ${color}`}>
      {text}
    </div>
  )
}
