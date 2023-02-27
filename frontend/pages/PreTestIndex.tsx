import Head from 'next/head'

import Card_fortelling from '@/components/LoreCard/Card_fortelling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Sagn from '@/types/SagnType';
import DisplaySagn from '@/components/View/displaySagn';
import { SagnModel } from '@/ViewModel/SagnModel';
import SearchNCards from '@/components/View/SearchNCards';

library.add(fas)

const Home = () => (
  <div>
    <SearchNCards />
  </div>
);

export default Home;