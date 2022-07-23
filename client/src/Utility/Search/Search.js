import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../../App.css'

function Search({ allArtists, setSearchQ, setSelected, type = "GET", secondarySearch }) {
    const items = allArtists;
    const handleOnSearch = (string) => {
        // A Search Component that is a descendant of the Contribute component will be given type === "POST",
        // and will need to check to ensure that searchQ does not exist in the the project's database in order
        // to avoid attempting to seed an artist that already exists. In the handleOnSelect function, the searchQ
        // will be set to the artist selected to mainain the same variable (searchQ) when checking against our database
        if (type === "POST") {
            setSearchQ(string)
        }
    }
    const handleOnSelect = (item) => {
        // When a Search Component is used to inititate a GET request, as in the case of Home/SearchModule,
        // the user must select an artist from the artists that appear in the auto-complete suggestions to ensure that
        // the artist already exists in the project's database. Therefore, setSelected is the only possible method to be 
        // called for type === "GET"
        if (type === "GET") {
            setSelected(item)
        }
        if (type === "POST") {
            setSearchQ(item['name'])
        }
    }
    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }
    return (
        <div>
            {secondarySearch ? (
                <div style={{ width: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }} >
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        autoFocus
                        formatResult={formatResult}
                    />
                </div>) : (<div style={{ width: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }} >
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        autoFocus
                        formatResult={formatResult}
                    />
                </div>)}
        </div>

    )
}

export default Search;