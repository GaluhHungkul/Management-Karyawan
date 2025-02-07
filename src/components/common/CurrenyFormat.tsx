const CurrenyFormat = (props:{ amount : number }) => {

    const idrFormat = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(props.amount)

  return (
    <span>{idrFormat}</span>
  )
}

export default CurrenyFormat