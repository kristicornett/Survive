import { Link } from 'react-router-dom'

export const Trade = ({ trade }) => {
    return <section className='trade' key={`trade--${trade.id}`}>
        <div>
             <Link key={trade.id} to={`/trades/${trade.id}`}>Offering {trade.description} For {trade.wanted} </Link>
        </div>
    </section>
}