import diagnosingDiabetes01 from './diagnosing-diabetes01.jpg';
import MultiChoiceQuestion from '../../MultiChoiceQuestion'

# Diagnosing Type 2 Diabetes

<img src={diagnosingDiabetes01} />

Signs and symptoms of type 2 diabetes often develop slowly. People may
have diabetes for years and not know it.

Persons with type 2 diabetes may experience increased thirst, frequent
urination, increased hunger, unintended weight loss, fatigue, blurred
vision, slow wound healing and frequent infections.

Persons are generally diagnosed with diabetes by a blood test called
Hemoglobin A1C.

The Hemoglobin A1C test measures the average blood sugar during the past
two to three months.

Like a sugary drink spilled on the floor that becomes sticky, as glucose
floats in the blood for a long period of time, glucose sticks to our red
blood cells. Hemoglobin A1C measures how many of our red-blood cells
have glucose stuck to them.

A normal A1C is less than 5.7%. An A1C greater than 6.5% or higher on
two separate tests is a diagnosis of diabetes. An A1C between 5.7 and
6.4% is generally considered prediabetes.

<MultiChoiceQuestion
question={`What does an A1C blood test measure?`}
answers={
[
{answerText: 'Average blood sugar over last 2-3 weeks', isAnswer: false},
{answerText: 'Average blood sugar over last 2-3 months', isAnswer: true},
{answerText: 'Average blood sugar over last 2-3 years', isAnswer: false},
]
}
/>
