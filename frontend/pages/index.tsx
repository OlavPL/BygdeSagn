import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import SortListBox from '@/components/LoreCard/SortListBox';
import DisplaySagas from '@/components/DisplaySagas';
import { SagnModel } from '@/ViewModel/SagnModel';
import SearchNCards from '@/components/View/SearchNCards';

library.add(fas)

interface IndexProps {
  sagnModel: SagnModel
}

const Home = () => (
  <>
    <SearchNCards />
  </>
);

export default Home;