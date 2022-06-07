import Multichoice from 'components/questionares/Multichoice';
import Matching from 'components/questionares/Matching';
import DragDrop from 'components/questionares/DragDrop';
import ShortAnswer from 'components/questionares/ShortAnswer';
import Numerical from 'components/questionares/Numerical';

function Questionare({ questionType, data, handleAnswer }) {
    return <div className='w-full h-full flex px-4 items-end'>
        {questionType == 'choice' || questionType == 'true/false' ? <Multichoice data={data} handleAnswer={handleAnswer} />
            : questionType == 'matching' ? <Matching data={data} handleAnswer={handleAnswer} />
                : questionType == 'draganddrop' ? <DragDrop data={data} handleAnswer={handleAnswer} /> 
                : questionType == 'shortanswer' ? <ShortAnswer handleAnswer={handleAnswer} />
                : questionType == 'numerical' ? <Numerical handleAnswer={handleAnswer} />
                : <div>Unsupported Question Type</div>}
    </div>;
}

export default Questionare;