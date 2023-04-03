import { ZombieSightingScrollingList } from "../zombies/ZombieSightingScrollingList"
import { TradeOffersHomeDisplay } from '../trades/TradeOffersHomeDisplay.js'
import './UserViews.css'

export const UserView = () => {

    return (
      <>
        <div className="home-full">
          <div className="home-col flex flex-col">
            <div className="home-main w-full">
              <div className="flex container flex-row justify-evenly">
                <section className="zombie_sightingBox scroll-container bg-slate-50/50 -mx-3 w-96 mt-10 block rounded-lg py-2 px-3 text-base font-semibold leading-7 bg-gray-60 text-gray-900 ">
                  <ZombieSightingScrollingList />
                </section>
                <section className="tradeOffers scroll-container bg-slate-50/50  -mx-3 mt-10 w-96 block rounded-lg py-2 px-3 text-base font-semibold leading-7 bg-gray-60 text-gray-900">
                  {<TradeOffersHomeDisplay />}
                </section>
              </div>
            </div>
            <div className="home-bar zombie text-right">
              <a href="http://localhost:3000/zombies">
              <span className="bar-text">Zombie Sighting </span>
              </a>
            </div>
            <div className="home-bar towns text-left">
              <a href="http://localhost:3000/towns">
                <span className="bar-text ml-4">Towns</span>
              </a>
            </div>
            <div className="home-bar trades text-right">
              <a href="http://localhost:3000/trades">
                <span className="bar-text"> Trade Offers </span>
              </a>
            </div>
            <div className="home-bar parks">
              <a href="http://localhost:3000/parks">
                <span className="bar-text ml-4">Park Trainings</span>
              </a>
            </div>
          </div>
        </div>
      </>
    );
}