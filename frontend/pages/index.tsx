import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import SearchNCards from '@/components/searchNCards';

library.add(fas)

const Home = () => (
  <>
    <SearchNCards />
  </>
);

export default Home;