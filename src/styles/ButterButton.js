import styled from '@emotion/styled'

const ButterButton = styled.button`
 background: black;
 transition: 0.5s; 
 position:relative;
 margin: 2%;
 color: white; 
 font-family: Berlin; 
 text-align: center;
 text-transform: uppercase; 
 border: 2px solid white; 
 font-size: 1rem;
 width: 30%; 
 height: 40px;
 cursor: pointer;
 display: inline-block;
 vertical-align: middle;
 z-index: 99999;

&:hover {
 border: 2px solid rgba(0,160,80,0);
 color: #FECE2E;

&:before, &:after {
 width: 100%;
 height:100%;
 z-index: 3;
 content:'';
 position: absolute;
 top:0;
 left:0;
 box-sizing: border-box;
 -webkit-transform: scale(0);
 transition: 0.5s;
 border-bottom: 3px solid #FECE2E;
 border-left: 3px solid #FECE2E;
 -webkit-transform-origin: 0 100%;
}
}

`
export default ButterButton