import React from 'react';
import {Button} from "primereact/button";

function LandingPage(props) {
    return (
    <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
            <section>
                <span className="block text-6xl font-bold mb-1">Get the best out of your trips</span>
                <div className="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
                <p className="mt-0 mb-4 text-700 line-height-3">Welcome to YourRoute!

                    Plan Your Perfect Vacation Itinerary

                    Are you dreaming of an unforgettable vacation but feeling overwhelmed by the countless options and decisions involved in creating the ideal itinerary? Look no further! YourRoute is here to transform your travel planning experience and guide you towards an exceptional adventure.

                    Discovering the Best Routes

                    At YourRoute, we understand that every traveler is unique, with distinct preferences, interests, and time constraints. Our innovative platform is designed to make your trip planning process seamless, efficient, and personalized. By leveraging advanced algorithms and cutting-edge technology, we analyze the vast array of destinations you desire to visit and meticulously craft the best route for your vacation.

                    Tailored to Your Preferences

                    Gone are the days of spending hours researching, mapping, and coordinating your travel itinerary. With YourRoute, all you need to do is tell us the places you wish to explore, and our intelligent system will handle the rest. Whether you're a nature enthusiast, history buff, or food lover, our algorithm takes your preferences into account to create a route that perfectly aligns with your interests.

                    Efficiency and Optimization

                    Optimizing your travel route can save you valuable time, ensuring you make the most of your vacation. YourRoute employs state-of-the-art optimization techniques, taking into consideration factors such as travel time, distance, and availability. We evaluate the best possible sequence of destinations, enabling you to cover more ground while avoiding unnecessary detours and backtracking.

                    Real-Time Updates

                    Flexibility is key when it comes to travel. YourRoute keeps you connected to your journey by providing real-time updates on any changes or disruptions that may impact your itinerary. If unforeseen circumstances arise, such as weather conditions or transportation delays, our platform promptly adjusts your route to ensure a smooth and stress-free experience.

                    Unlock the World's Hidden Gems

                    At YourRoute, we don't just focus on the popular tourist spots. We take pride in uncovering the hidden gems and off-the-beaten-path destinations that make your travel experience truly extraordinary. By incorporating these hidden treasures into your route, we ensure that you have an authentic and immersive adventure that goes beyond the typical tourist traps.

                    Start Planning Your Dream Vacation Today

                    Ready to embark on a journey of a lifetime? Begin planning your dream vacation with YourRoute. Our user-friendly interface, intelligent algorithms, and dedication to personalized experiences will revolutionize the way you plan and execute your trips.

                    Experience the joy of stress-free travel planning and create unforgettable memories along the way. YourRoute is your trusted companion, always there to guide you towards the best route for your perfect vacation. Start exploring now!




                </p>
            </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden">
            <img src="/assets/img/roadtrip-1583526313.jpg" alt="hero-1" className="md:ml-auto block" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)', height: '100vh' }} />
        </div>
    </div>
    );
}

export default LandingPage;