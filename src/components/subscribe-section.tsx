import { Button } from "@/components/ui/button"

export default function SubscribeSection() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-sky-600">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl mb-4">
                Be the first to know about new creators and experiences
              </h2>
              <Button className="bg-white text-sky-600 hover:bg-gray-100 w-fit">Subscribe to Discover</Button>
            </div>
            <div className="hidden md:block relative">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Creator"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
src="https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"                    alt="Creator"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
src="https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"                    alt="Creator"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
src="https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"                    alt="Creator"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
