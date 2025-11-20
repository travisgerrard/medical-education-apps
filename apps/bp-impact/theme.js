import { BsChevronRight, BsCheckCircle, BsArrowRightCircle } from 'react-icons/bs';

export const theme = {
    colors: {
        primary: 'rgb(255, 65, 65)', // Red
        link: 'rgb(255, 65, 65)',     // Red
    },
    icons: {
        arrow: BsChevronRight,
        checkmark: BsCheckCircle,
        nextSection: BsArrowRightCircle,
    },
    text: {
        appName: 'Hypertension Application',
        disclaimerText: 'The Hypertension Application provides useful information but is not a substitute for professional medical advice, diagnosis, or treatment. If you have a medical emergency, call your healthcare provider or dial 911. Before acting on any of the information in the Hypertension Application, please consult with your healthcare provider.',
    },
};

export default theme;
