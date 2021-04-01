// import React, { useState } from 'react';
// import Flex from '../styles/Flex'
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
// import Img from "gatsby-image";
// import { graphql } from "gatsby"


// const thumbItems = (items, [setThumbIndex, setThumbAnimation]) => {
//     return items && items.map((item, index) => {
//         console.log(item.src, 'item')
//     return <div key={index} className="thumb" onClick={() => {setThumbIndex(index); setThumbAnimation(true)}}>
//            <div className="item"><Img width='400px' src={item} /></div>
//         </div>})
//     }

// const Carousel = ({data}) => {

//         const gello = data.map(i => Object.values(i).map(({ src }) => src)).flat()
//         const items = gello.map((item, index) => <img className="item" src={item} alt={index}/>)

//         console.log(items, 'items')
//         const [mainIndex, setMainIndex] = useState(0);
//         const [mainAnimation, setMainAnimation] = useState(false);
//         const [thumbIndex, setThumbIndex] = useState(0);
//         const [thumbAnimation, setThumbAnimation] = useState(false);
//         const [thumbs] = useState(thumbItems(items, [setThumbIndex, setThumbAnimation]));
    
//         const slideNext = () => {
//             if (!thumbAnimation && thumbIndex < thumbs.length - 1) {
//                 setThumbAnimation(true);
//                 setThumbIndex(thumbIndex + 1);
//             }
//         };
    
//         const slidePrev = () => {
//             if (!thumbAnimation && thumbIndex > 0) {
//                 setThumbAnimation(true);
//                 setThumbIndex(thumbIndex - 1);
//             }
//         };
    
//         const syncMainBeforeChange = (e) => {
//             setMainAnimation(true);
//             if (e.type === 'action') {
//                 setThumbAnimation(true);
//             }
//         };
    
//         const syncMainAfterChange = (e) => {
//             setMainAnimation(false);
    
//             if (e.type === 'action') {
//                 setThumbIndex(e.item);
//                 setThumbAnimation(false);
//             } else {
//                 setMainIndex(thumbIndex);
//             }
//         };
    
//         const syncThumbs = (e) => {
//             setThumbIndex(e.item);
//             setThumbAnimation(false);
    
//             if (!mainAnimation) {
//                 setMainIndex(e.item);
//             }
//         };

//     return [
//         <div style={{height: '100vh', width: '100%'}}>
//         <Flex>
//             <div className="btn-prev" onClick={slidePrev}>&lang;</div>
//         <AliceCarousel
//              activeIndex={mainIndex}
//              animationType="fadeout"
//              animationDuration={800}
//              disableDotsControls
//              disableButtonsControls
//              infinite
//              items={items}
//              mouseTracking={!thumbAnimation}
//              onSlideChange={syncMainBeforeChange}
//              onSlideChanged={syncMainAfterChange}
//              touchTracking={!thumbAnimation}
//              />,
             
//             <div className="btn-next" onClick={slideNext}>&rang;</div>
//             </Flex>
//         <div className="thumbs">
//             <AliceCarousel
//                  activeIndex={thumbIndex}
//                  autoWidth
//                  disableDotsControls
//                  disableButtonsControls
//                  items={thumbs}
//                  mouseTracking={false}
//                  onSlideChanged={syncThumbs}
//                  touchTracking={!mainAnimation}
//             />
//         </div>
//         </div>
//      ]
// };

// export default Carousel

