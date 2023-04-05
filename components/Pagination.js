const Pagination =({items,pageSize,currentPage,onPageChange})=>{
    const pagesCount = Math.ceil(items/pageSize)

    if(pagesCount===1)
    {
        return null
    }
    console.log(pagesCount)

    const pages = []
    for(let i=1;i<=pagesCount;i++)
    {
        pages.push(i)
    }
    console.log(pages)

    return (
        <div >
            <ul className="pagination">
            {
                pages.map(page=>{
                    return <li
                    key={page}
                    className={
                        page === currentPage? "pageItemActive":"pageItem"
                    }
                    >
                        <a onClick={()=>{
                            onPageChange(page)
                        }}>{page}</a>
                    </li>
                })
            }
            </ul>
            
        </div>
    )
}

export default Pagination