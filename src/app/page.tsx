import Friends from '@/components/friends'
import World from '@/components/world'

export default function Home() {
  return (
    <main className="">
      <h1 className='text-center text-5xl uppercase'>
        Paint it black
      </h1>
     <World />
     <Friends />
    </main>
  )
}
