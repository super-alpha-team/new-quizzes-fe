import Loading from "components/launch/Loading"

export default function TestLoadingPage() {
    return (
        <Loading message="Loading data" currentIndex={1} gradeData={{
            question_index: 1,
            grade: 0
        }}/>
    );
}