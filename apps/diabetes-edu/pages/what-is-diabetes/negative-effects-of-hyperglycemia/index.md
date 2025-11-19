import MultiChoiceQuestion from '../../MultiChoiceQuestion'
import NegativeEffects01 from './NegativeEffects01.jpg';
import NegativeEffects02 from './NegativeEffects02.jpg';
import NegativeEffects03 from './NegativeEffects03.jpg';
import NegativeEffects04 from './NegativeEffects04.jpg';
import NegativeEffects05 from './NegativeEffects05.jpg';

# Complications of Uncontrolled Diabetes

<img src={NegativeEffects01} />

<img src={NegativeEffects02} />

> - Diabetes can damage the small blood vessels in the kidney.
> - Over time the damaged kidneys are unable to filter the blood of excess fluid and waste from the body.
> - Chronic kidney disease if left untreated can get worse over time and progress to kidney failure.
> - When the kidneys stop working, dialysis or a kidney transplant may be necessary for life.
> - Chronic kidney disease can contribute to the development of heart disease or stroke.
> - Not all patients with chronic kidney disease develop kidney failure.
> - Blood sugar and blood pressure control can help prevent the development of chronic kidney disease.
> - Lose weight, quit smoking and take your medications as prescribed. Choose foods lower in salt and eat more fruits and vegetables.

<img src={NegativeEffects03} />

> - Over time, high blood sugar can damage the nerves in your body.
> - One type of nerve damage affects the nerves in legs.
> - Symptoms can range from mild numbness of the feet to pain that makes it difficult to do normal activities.
> - Persons may develop sores or wounds on their feet that the person may not feel which may delay healing or cause more damage.

<img src={NegativeEffects04} />

> - People with diabetes are 2 to 4 times likely to develop a stroke or heart disease.
> - The extra sugar in the blood can cause increased deposits of fats or blood clots in the blood vessel walls. Blood clots or deposits can reduce blood flow or completely cut off blood flow to the brain or heart.
> - Brain and heart function depend on receiving oxygen flow from the blood.
> - By following a heart healthy diabetes diet, avoiding all tobacco, exercising and taking all your medications as prescribed, you may prevent stroke or heart attack.
> - Call 911 for any symptoms of stroke or heart attack.

<img src={NegativeEffects05} />

> - High blood sugar can damage the blood vessels in the eye leading to a condition called diabetic retinopathy.
> - Early symptoms include floaters, blurriness, dark areas of vision and difficulty perceiving color.
> - Over time, blindness can occur.
> - This is why you should get an eye exam every one to two years.

<MultiChoiceQuestion
question={`Which of the following is NOT a complications of long term uncontrolled diabetes?`}
answers={
[
{answerText: 'Kidney disease', isAnswer: false},
{answerText: 'Stroke and heart attack', isAnswer: false},
{answerText: 'Blindness', isAnswer: false},
{answerText: 'Foot wounds', isAnswer: false},
{answerText: 'Baldness', isAnswer: true},
]
}
/>
