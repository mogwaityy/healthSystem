import React from 'react';
import { Element } from 'react-scroll';
import Home from '../home/homes/Home';
import Service from '../home/services/Service';
import Contact from '../home/Contact/Contact';
import Model from 'react-modal'
import MakeAppointment from "../Patient/MakeAppointment";
import {CheckAppointment} from "../Patient/CheckAppointment";

export const HomePages = () => {
  return (
    <>
      <Element id="home"><Home /></Element>
      <Element id="service"><Service /></Element>
      <Element id="contact"><Contact /></Element>
    </>
  );
}

export default HomePages;
