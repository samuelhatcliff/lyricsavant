import axios from 'axios';
import useSWR from 'swr';
import CircularProgressWithLabel from './CircularProgressWithLabel';


//TODO: use SWR to immediately update allArtists
const fetcher = async () => {
    return await axios.get(`/api/seed/status`);
};



function SWR() {

    const { data, error, isValidating } = useSWR('http://localhost:5000', fetcher, { refreshInterval: 1000 })

    let index = 0
    if (data) {
        console.log(data, "data")
        console.log(data.data, "data.data")
        console.log(data.data.data, "data.data.data")
        let extracted = data.data.data
        index = extracted.length
    }

    let percentage = (index * 100) / 78

    if (data) {
        return <div>
            <CircularProgressWithLabel percentage={percentage} />
        </div>;
    }
}


export default SWR