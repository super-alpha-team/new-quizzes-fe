import SubmitButton from 'components/helpers/SubmitButton';

function NotStartedQuiz() {
    function reload() {
        location.reload();
    }

    return (
        <div className='h-screen w-screen bg-[#46178F] font-display font-semibold flex justify-center items-center gap-8 flex-col'>
            <div className="flex p-6 font-extrabold text-xl lg:text-3xl md:text-2xl text-white tracking-wide bg-[#230B47] shadow-dark">
                {`This quiz has not started yet.`}
            </div>
            <SubmitButton text={'refresh'} onSubmit={reload} />
        </div>
    );
}

export default NotStartedQuiz;