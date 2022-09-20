export default ({data}) => {
    
    return(
        <tr key={data.time}>
          <td>
          {data.time.getDate() + ". " + data.time.toLocaleString('en-US', {
    month: 'long',
  })}
  </td>
          <td>{data.open}</td>
          <td>{data.high}</td>
          <td>{data.low}</td>
        </tr>
    )
}