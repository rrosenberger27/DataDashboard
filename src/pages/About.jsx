import React from 'react';
import "../styles/About.css"


const About = () => {
    return (
        <div className='about-container'>
            <h1>About MovieDash!</h1>
            <p>MovieDash is a platform made for you to explore a total of 296 selections. You can filter these selections by their IMDB rating, their general rating (PG, G, etc.), or whether they have any N/A categories. You are also free to search for movies by their title. Each movie has its own detail view to look at, including a poster and some other information. At the top of the dashboard, there's a few broader statistics available to take a look at. Go explore for yourself!  </p>

            <div className='about-img-container'>
                <img src='https://m.media-amazon.com/images/I/81dae9nZFBS._UF894,1000_QL80_.jpg'/>
                <img src='https://substackcdn.com/image/fetch/$s_!SjlY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F289ad232-bb03-4b07-848c-d0dad888a4dc_2000x2963.png'/>
                <img src='https://admin.itsnicethat.com/images/3CzWUmmXvOtHmdH0J1VNY-f9riA=/254910/format-webp%7Cwidth-1440/4._Oppenheimer.jpg' />
            </div>
            
        </div>
    );
};

export default About;