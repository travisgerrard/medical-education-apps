import React, { useContext } from 'react';
import LifestyleQuickFactSquare from './LifestyleQuickFactSquare.js';
import {
  RegularText,
  Header,
} from '../../../src/Components/ReadingScreen/MainReadingView';
import { Context as TextContext } from '../../../src/Components/context/TextContext';

export default function index() {
  const { state: textState } = useContext(TextContext);

  const { textSize } = textState;
  return (
    <div>
      <Header>Hypertension Medications</Header>
      <Header>Fast Facts</Header>

      <LifestyleQuickFactSquare />
    </div>
  );
}

// # Overview

// Lifestyle plays an important role in the development and management of hypertension. Unhealthy habits such as eating an unhealthy diet, drinking alcohol, and  living a sedentary lifestyle can contribute to high blood pressure. Regular physical activity, a healthy diet, and avoiding excess weight can help to prevent and manage hypertension. Below is a general outline of the impact our lifestyle has on hypertension. In the following sections we will dive into each one in a bit more detail.

// <LifestyleQuickFactSquare />

// <!-- What and how much you eat is very important for managing your blood pressure. How does food affect my blood pressure? This section of the app will focus on two methods of meal planning – the DASH Diet and TK.

// Eating food is what gives us energy. Calories are energy and come from the amount of carbohydrate, protein, and fat that is found in food. Food also has water, vitamins, minerals, and antioxidants that do not give it calories, but provide other essential nutrients. Two important minirals when it comes to hypertention that food contains is sodium and potassium.

// <img src={theBasics} />

// The foods that contain carbohydrate increase blood glucose the most. They start breaking down into glucose immediately in your mouth by the digestive enzymes in your saliva. As these foods travel in your body from your mouth -> stomach -> intestines, they are broken down into glucose that flows into your blood stream. The hormone insulin is the key that gets the sugar out of your blood and into the cells within your body to give you energy. Eating a balance of foods with fiber, protein and fat can stabilize blood glucose.

// Carbohydrate comes from foods with:

// <CarbTable>
//       <div>
//         <h1> Grains & Starches</h1>
//         <hr />
//         <p>White & brown bread</p>
//         <p>White & brown</p>
//         <p>Rice</p>
//         <p>Potatoes</p>
//         <p>Potato chips</p>
//         <p>Cereal</p>
//         <p>Oatmeal</p>
//         <p>Tortillas</p>
//       </div>
//       <div>
//         <h1>
//           Milks & Yogurt
//         </h1>
//         <hr />
//         <p>
//           Cow’s milk
//         </p>
//         <p>
//           Almond milk
//         </p>
//         <p>
//           Cow's yogurt
//         </p>
//         <p>
//           Coconut yogurt
//         </p>
//       </div>
//       <div>
//         <h1>
//           Lentils / Beans
//         </h1>
//         <hr />
//         <p>
//           Hummus
//         </p>
//         <p>
//           Kidney beans
//         </p>
//         <p>
//           Refried beans
//         </p>
//         <p>
//           Chili
//         </p>
//       </div>
//       <div>
//         <h1>
//           Vegetables
//         </h1>
//         <hr />
//         <p>
//           Non-starchy
//         </p>
//         <p>
//           Starchy
//         </p>
//       </div>
//       <div>
//         <h1>
//           Fruit
//         </h1>
//         <hr />
//         <p>
//           Whole fruit
//         </p>
//         <p>
//           Fruit juice
//         </p>
//         <p>
//           Dried fruit
//         </p>
//       </div>
//       <div>
//         <h1>
//           Added Sugar
//         </h1>
//         <hr />
//         <p>
//           All sugar
//         </p>
//         <p>
//           Pop
//         </p>
//         <p>
//           Energy drinks
//         </p>
//         <p>
//           Ice cream
//         </p>
//         <p>
//           Cookies
//         </p>
//         <p>
//           Candy
//         </p>
//       </div>

// </CarbTable> -->
