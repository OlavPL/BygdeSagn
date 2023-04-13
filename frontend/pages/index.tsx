import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import HomePage from '@/components/homePage';

library.add(fas)

const Home = () => (
  <>
    <HomePage />
  </>
);

export default Home;