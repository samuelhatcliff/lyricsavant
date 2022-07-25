import axios from 'axios';
import useSWR from 'swr';
import CircularProgressWithLabel from './CircularProgressWithLabel';

const fetcher = async () => {
    return await axios.get(`/api/seed/status`);
};

console.log('test')

function SWR() {
    const { data } = useSWR('http://localhost:5000', fetcher, { refreshInterval: 1000 })
    let index = 0;
    let percentage;
    if (data) {
        let extracted = data.data.data
        index = extracted.length
        percentage = (index * 100) / 78
    }

    if (data) {
        return <div>
            <CircularProgressWithLabel percentage={percentage} />
        </div>;
    }
}


export default SWR