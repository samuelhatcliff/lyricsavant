import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../../App.css'


// To-do: change format result so name is the only thing that returns

function Search({ allArtists, searchQ, setSearchQ, setSelected, classs, type = "search" }) {
    const items = allArtists;
    const errorMsg = `The artist you have searched for is not in our database. If you'd like to add this artist, you can click on the "Contribute" tab in the navbar.`
    const handleOnSearch = (string) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        if (type === "contribute") {
            setSearchQ(string)
        }
    }

    const handleOnHover = (result) => {

        // the item hovered
        // console.log(result, "on hover")
    }
    const handleOnSelect = (item) => {
        // the item selected
        if (type === "search") {
            setSelected(item)
        }
        if (type === "contribute") {
            setSearchQ(false)
        }
        console.log(item, "on select")
    }
    const handleOnFocus = () => {
        // console.log('Focused')
    }
    const formatResult = (item) => {
        return (
            <>
                <span className={classs} style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }
    return (

        <div style={{ width: 400 }} >
            <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onHover={handleOnHover}

                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                // onChange={showString}
                autoFocus
                formatResult={formatResult}
            />
        </div>
    )
}

export default Search;