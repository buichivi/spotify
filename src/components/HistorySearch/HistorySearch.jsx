import CategoryItem from "../CategoryItem"
import HistorySearchItem from "../HistorySearchItem"

const HistorySearch =  ({ className = '' }) => {
  return (
    <section className={`pt-2 ${className}`}>
            <div className="h-[30px] mb-4">
                <h2 className="text-2xl text-white font-bold">Recent searches</h2>
            </div>
            <div className="grid grid-cols-5 2xl:grid-cols-8 gap-category-gap">
                <HistorySearchItem name="The Weeknd" type="Artist"/>
                <HistorySearchItem name="The Weeknd" type="Artist"/>
                <HistorySearchItem name="The Weeknd" type="Artist"/>
                <HistorySearchItem />
            </div>
        </section>
  )
}

export default HistorySearch