import React from 'react'
import { Field } from 'formik';
import Flex from '../styles/Flex'
import styled from "@emotion/styled"

export const DropDownBrands = styled.section`
        // display: none;
        // -webkit-calc(100% - 212px);
        height: calc(100vh -175px);
        position: ${props => props.open ? 'fixed' : 'absolute'};
        display: ${props => props.open ? 'block' : 'unset'};
        top: 170px;
        // bottom: 0;
        left: 0;
        // right: 0;
        width: 100%;
        transition: .5s ease;
        background-color: #fff;
        opacity: ${props => props.open ? '0.8' : '0'};
        z-index: ${props => props.open ? '888888' : '0'};
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

`
export const Header = styled.header`
        font-size: 14px;
        line-height: 1;
        font-family: ProximaNova-Regular, "Helvetica Neue", Verdana, Arial, sans-serif;
        letter-spacing: 0.35px;
        // margin-bottom: 10px;
        padding: 0px;
        border: 0px;
        vertical-align: baseline;
        position: relative;
        z-index: 9999;
        color: ${props => props.isDark ? 'white' : 'black'};
        background-color: ${props => props.isDark ? '#1D1D1D' : '#FCFCFC'};
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 180px;
        // border-bottom: 1px solid rgb(242, 242, 242);
`

export const Navigation = styled.nav`
        font-size: 14px;
        z-index: 9999;
        line-height: 1;
        font-family: ProximaNova-Regular, "Helvetica Neue", Verdana, Arial, sans-serif;
        letter-spacing: 0.35px;
        margin: 25px;
        padding: 0px;
        border: 0px;
        // vertical-align: baseline;
        position: relative;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        align-items: baseline;
        height: 20px;
        @media (max-width: 1000px) {
                display: none;
              }
`
export const NavMenuItem = styled.span`
        // font-size: 14px;
        line-height: 1;
        font-family: CODE1 !important;
        // font-weight: bold;
        // letter-spacing: 0.35px;
        margin: 0px;
        padding: 0px;
        border: 0px;
        text-decoration: none;
        // vertical-align: baseline;
        padding-bottom: 2px;
        color: ${props => props.isDark ? 'white !important' : 'black !important'};
        text-transform: uppercase;
        opacity: 1;
        margin-bottom: 4px;
        margin: 6px 16px 4px;
        font-size: 0.928571rem;
        font-weight: bold;
        text-transform: uppercase;
        line-height: 17px;
        z-index: 100;
        cursor: pointer;
        & > a{
        color: ${props => props.isSale ? 'rgb(174, 0, 0)' : 'black'};
        }
`
export const MobileNavMenuItem = styled.div`
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        font-family: CODE1 !important;
        border-radius: 6px;
        border-bottom: 1px solid rgba(0, 0, 1, 0.06);
        text-decoration: none;
        // vertical-align: baseline;
        padding-bottom: 2px;
        color: ${props => props.isDark ? 'white !important' : 'black !important'};
        text-transform: uppercase;
        opacity: 1;
        margin-bottom: 4px;
        margin: 6px 16px 4px;
        font-size: 1.2em;
        font-weight: bold;
        text-transform: uppercase;
        line-height: 17px;
        z-index: 100;
        cursor: pointer;
        & > a{
                color: ${props => props.isSale ? 'rgb(174, 0, 0)' : 'black'};
        }
`
export const CartContainer = styled.div`
        position: relative;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        height: 20px;
        background-color: rgb(254, 205, 47);
`
export const AppContainer = styled.div`
        background: white;
        width: 100%;
        display: flex;
        position: relative;
        top: 0px;
        left: 0px;
        flex-direction: column;
        min-height: 100vh;
        z-index: 30;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 27px 0px;
        will-change: transform;
`

export const LogoHolder = styled.div`
        font-size: 14px;
        line-height: 1;
        font-family: ProximaNova-Regular, "Helvetica Neue", Verdana, Arial, sans-serif;
        letter-spacing: 0.35px;
        margin-bottom: 10px;
        padding: 0px;
        border: 0px;
        vertical-align: baseline;
        position: relative;
        -webkit-box-pack: center;
        justify-content: center;
        display: flex;
        // width: 33%;
        align-items: flex-start;
        height: 50px;
        

`
export const DescriptionFlex = styled(Flex)`
    flex-direction: column;
    @media (max-width: 800px){
      width: 100%;
    }
`
export const TitleAndFilter = styled(Flex)`
    flex-direction: row;
    @media (max-width: 800px){
      width: 100%;
      flex-direction: column;
      align-items: center;
    }
`

export const Heading1 = styled.h1`
        font-size: 1.5rem;
        text-align: center;
        line-height: 1;
        font-family: BerlinXBold;
        letter-spacing: 0.35px;
        margin: 15px 0;
        padding: 0px;
        border: 0px;
        vertical-align: baseline;
        padding-bottom: 2px;
        color: black;
        text-transform: uppercase;
        opacity: 1;     
`

export const Footer = styled.footer`
        display: flex;
        // position: absolute;
        bottom: 0;
        width: 100%;
        height: 130px;
        background: ${props => props.isDark ? '#1D1D1D' : 'white'};
        z-index: 999999;
        align-items: center;
        justify-content: space-around; 
        // @media (max-width: 800px) {
        //       }
`

export const PageHeading = styled.h1`
        font-family: bangers;
        font-size: ${props => props.width || '2.3rem'};
        text-align: center;
        color: ${props => props.isDark ? 'white' : 'black'}
`
export const LoginInput = styled(Field)`
        width: ${props => props.width || '70%'};
        height: 50px;
        background: transparent;
        border: ${props => props.border || '5px solid white'};
        margin: 3%;
        // font-family: CODE;
        color: black;
        &::placeholder {
                font-family: CODE;
                color: black;
        }
`
export const AuthFormBox = styled.form`
        background: rgba(255, 255, 255, 0.6);
        margin-top: 5%;
        max-width: 600px;
        text-align: center;
        padding: 5%;
        border: 0.1px solid rgba(0,0,0,0.4);
        border-radius: 2%;
        z-index: 8888;
        @media (max-width: 800px) {
                margin-top: unset;
                padding: 5%;
              }
`

export const MobileNavigation = styled.nav`
        max-width: 300px;
        width: 100%;
        height: 650px;
        position: fixed;
        border-radius: 6px;
        box-shadow: 0 0 5px 0 rgba(102, 102, 102, 0.5);
        top: 67px;
        left: 0;
        z-index: 99999;
        color: ${props => props.isDark ? 'white' : 'black'};
        background-color: ${props => props.isDark ? '#1D1D1D' : 'white'};
        // display: ${({ openBurger }) => openBurger ? 'flex' : 'none'};
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space
        transform: ${({ openBurger }) => openBurger ? 'translateX(-40px)' : 'translateX(-100%)'};
        transition: transform 0.6s ease-in-out !important;  
        @media (min-width: 1000px) {
                display: none;
              }

`
export const ContainerFlex = styled(Flex)`
  width: 70%;
  margin: 20px 0 0 0;
@media (max-width: 800px) {
  width: 100%;
}
`

export const ContainerFlexHide = styled(Flex)`
width: ${props => props.width};
@media (max-width: 800px) {
  display: none;
}
`