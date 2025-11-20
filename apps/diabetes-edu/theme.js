import { IoArrowForward, IoCheckmarkCircleOutline, IoCaretForward } from 'react-icons/io5';

export const theme = {
    colors: {
        primary: 'rgb(0, 162, 97)', // Green
        link: 'rgb(1, 121, 213)',    // Blue
    },
    icons: {
        arrow: IoArrowForward,
        checkmark: IoCheckmarkCircleOutline,
        nextSection: IoCaretForward,
    },
    text: {
        appName: 'VM Diabetes Application',
        disclaimerText: 'The VM Diabetes Application provides useful information but is not a substitute for professional medical advice, diagnosis, or treatment. If you have a medical emergency, call your healthcare provider or dial 911. Before acting on any of the information in the VM Diabetes Application, please consult with your healthcare provider.',
    },
};

export default theme;
