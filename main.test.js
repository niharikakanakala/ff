import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native'; // Import from react-native package
// import '@testing-library/jest-dom/extend-expect';

import Editor from './components/Editor';

describe('Editor Component', () => {

    test('test case 1', async() => {
        render(<Editor />);
  
        expect(screen.getByText('A+')).toBeInTheDocument;
        expect(screen.getByText('A-')).toBeInTheDocument;
        expect(screen.getByText(/Analyse/i)).toBeInTheDocument;
      
      });

      test('test case 2', () => {
        render(<Editor />);
  
        const tarea = screen.getByPlaceholderText('Type something...');
        const styleArray = tarea.props.style; // Get the array of styles
        
        const textStyle = styleArray.find(styleObj => styleObj.hasOwnProperty('textAlign'));
        const fontSizeStyle = styleArray.find(styleObj => styleObj.hasOwnProperty('fontSize'));
        const textDecorationStyle = styleArray.find(styleObj => styleObj.hasOwnProperty('textDecorationLine'));
        const textTransformStyle = styleArray.find(styleObj => styleObj.hasOwnProperty('textTransform'));
        
        // Test individual style properties
        expect(textStyle.textAlign).toBe('left');
        expect(fontSizeStyle.fontSize).toBe(16);
        expect(textDecorationStyle.textDecorationLine).toBe('none');
        expect(textTransformStyle.textTransform).toBe('capitalize');


      });

      test('testing initial settings', () => {
        const { getByText, getByPlaceholderText } = render(<Editor />);
  
    const btn = getByText('Analyse');

    fireEvent.press(btn);

    const textarea = getByPlaceholderText('ANALYSIS');
    const value = JSON.parse(textarea.props.value); // Use props.value to get the value in React Native
    
    const initialValue = {
        no_of_letters: 0,
        no_of_words: 0,
        no_of_integers: 0,
        no_of_spaces: 0,
        no_of_specialsymbols: 0,
        bold: false,
        italian: false,
        underline: false,
        quotes: false,
        currCase: 'capitalize',
        align: 'left',
        font: 16
    };
    
    expect(value).toEqual(initialValue);
    });
        
    test('testing initial settings', () => {
        const { getByText, getByPlaceholderText } = render(<Editor />);
  
  const btn = getByText('Analyse');

  fireEvent.press(btn);

  const textarea = getByPlaceholderText('ANALYSIS');
  const value = JSON.parse(textarea.props.value); // Use props.value to get the value in React Native
  
  const initialValue = {
    no_of_letters: 0,
    no_of_words: 0,
    no_of_integers: 0,
    no_of_spaces: 0,
    no_of_specialsymbols: 0,
    bold: false,
    italian: false,
    underline: false,
    quotes: false,
    currCase: 'capitalize',
    align: 'left',
    font: 16
  };
  
  expect(value).toEqual(initialValue);
       
});
      

test('testing quote currCase alignment', () => {
    const { getByPlaceholderText, getByText, getByTestId, } = render(<Editor />);
    
    const tarea = getByPlaceholderText('Type something...');
    fireEvent.changeText(tarea, 'pra" "G');
    

    const alignbtn = getByTestId('center-icon');
    const quotebtn = getByText("\" \"");
    const casebtn = getByTestId('UC');
    const btn = getByText('Analyse');
    
   
  
    fireEvent.press(alignbtn);
    fireEvent.press(quotebtn);
    fireEvent.press(casebtn);
    fireEvent.press(btn);
    
    const textarea = getByPlaceholderText('ANALYSIS');
    const value = JSON.parse(textarea.props.value); // Use props.value to get the value in React Native
    
    const data = {
      no_of_letters: 4,
      no_of_words: 2,
      no_of_integers: 0,
      no_of_spaces: 1,
      no_of_specialsymbols: 4,
      bold: false,
      italian: false,
      underline: false,
      quotes: true,
      currCase: 'uppercase',
      align: 'center',
      font: 16
    };
    
    expect(value).toEqual(data);
  });


  test('testing font button', async () => {
    const { getByPlaceholderText, getByText } = render(<Editor />);
    
    const tarea = getByPlaceholderText('Type something...');
    
    fireEvent.changeText(tarea, 'pra'); // Simulate typing 'pra' into the textarea
    
    const btnAplus = screen.getByText('A+');
    const btnAminus = screen.getByText('A-');
    const btn = screen.getByText('Analyse');
    
    fireEvent.press(btnAplus);
    fireEvent.press(btnAminus);
    fireEvent.press(btnAplus);
    fireEvent.press(btn);
    
    const textarea = getByPlaceholderText('ANALYSIS');
    const value = JSON.parse(textarea.props.value); // Use props.value to get the value in React Native
    
    expect(value.font).toBe(17);
    expect(value.no_of_letters).toBe(3);
    expect(value.no_of_words).toBe(1);
    expect(value.currCase).toBe('capitalize');
  });
  
  test('testing bold italian underline', () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<Editor />);
    
    const tarea = getByPlaceholderText('Type something...');
    fireEvent.changeText(tarea, 'pra');
    
    const boldIcon = getByTestId('bold-icon');
    const italicIcon = getByTestId('italic-icon');
    const underlineIcon = getByTestId('underline-icon');
    const analyseBtn = getByText('Analyse');
    
    fireEvent.press(boldIcon);
    fireEvent.press(italicIcon);
    fireEvent.press(underlineIcon);
    fireEvent.press(analyseBtn);
    
    const textarea = getByPlaceholderText('ANALYSIS');
    const value = JSON.parse(textarea.props.value);
    
    expect(value.bold).toBe(true);
    expect(value.italian).toBe(true);
    expect(value.underline).toBe(true);
  });
  
});