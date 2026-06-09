

function Trancate({ description }: { description: string }) {
  const trancated = (description.length > 50) ? description.slice(0, 50) + "..."
    : description
  return <span>{trancated}</span>
}

export default Trancate