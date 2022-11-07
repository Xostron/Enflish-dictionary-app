import { lazy } from 'react'

// OneCard
const CardDetailPage = lazy(() => import('../pages/OneCard/OneCardDetailPage'))
const CardEditPage = lazy(() => import('../pages/OneCard/OneCardEditCreatePage'))
const CardTrainPage = lazy(() => import('../pages/OneCard/OneCardTrainPage'))
const CardStatisticPage = lazy(() => import('../pages/OneCard/OneCardStatisticPage'))
const SelectWordsPage = lazy(() => import('../pages/OneCard/SelectWordsPage'))

// MyWords
const StatisticPage = lazy(() => import('../pages/MyWords/StatisticPage'))
const EditWordsPage = lazy(() => import('../pages/MyWords/EditWordsPage'))
const TrainingPage = lazy(() => import('../pages/MyWords/TrainingPage'))

// TrainingPages
const TrainPageLearning = lazy(() => import('../pages/TrainingPages/TrainPageLearning'))
const TrainPageWrite = lazy(() => import('../pages/TrainingPages/TrainPageWrite'))
const TrainPageSprint = lazy(() => import('../pages/TrainingPages/TrainPageSprint'))

// App
const MainPage = lazy(() => import('../pages/MainPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const AllCardsPage = lazy(() => import('../pages/AllCardsPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const OneCardRoutePage = lazy(() => import('../pages/OneCardRouterPage'))
const MyWordsRouterPage = lazy(() => import('../pages/MyWordsRouterPage'))
const TestPage = lazy(() => import('../pages/TestPage'))


export const Pages = [
    { element: <OneCardRoutePage />, path: 'card/:id/*' },
    { element: <AboutPage />, path: `about` },
    { element: <AllCardsPage />, path: `card/all` },
    { element: <LoginPage />, path: `login` },
    { element: <MainPage />, path: `` },
    { element: <MyWordsRouterPage />, path: 'words/*' },
    { element: <TestPage />, path: 'test' }
]

//  '/card/:id/...'
export const OneCardPages = [
    { element: <CardDetailPage />, path: 'detail' },
    { element: <CardTrainPage />, path: 'train' },
    { element: <CardStatisticPage />, path: 'stc' },
    { element: <CardEditPage />, path: 'edit' },
    { element: <SelectWordsPage />, path: 'add' },
    { element: <TrainPageLearning />, path: 'train_learning' },
    { element: <TrainPageWrite />, path: 'train_write/:id' },
    { element: <TrainPageSprint />, path: 'train_sprint' },
]
// ''
export const MyWordsPages = [
    { element: <EditWordsPage />, path: `edit` },
    { element: <TrainingPage />, path: `train` },
    { element: <StatisticPage />, path: `stc` },
    { element: <TrainPageLearning />, path: 'train_learning' },
    { element: <TrainPageWrite />, path: 'train_write/:id' },
    { element: <TrainPageSprint />, path: 'train_sprint' },
]