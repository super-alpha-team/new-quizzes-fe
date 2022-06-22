import PlatformHeader from 'components/app/platform/PlatformHeader';
import HomePage from 'components/articles/HomePage';
import OurTeam from 'components/articles/OurTeam';
import TeXDisplay from 'components/helpers/TeXDisplay';
import { useRouter } from 'next/router';

function LTIConfig() {
    const router = useRouter();
    let id = router.query.id || 0;
    return (
        <div className='min-h-screen w-full h-full'>
            <PlatformHeader />
            {id == 0 ? <HomePage /> : id == 1 ? <OurTeam /> : <>id not found</>}
        </div>
    );
}

export default LTIConfig;