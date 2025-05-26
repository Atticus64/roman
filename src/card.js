/**
 * @typedef user
 * @property {string} id - The ID of the user.
 * @property {string} nombre - The name of the user.
 * @property {string} carrera - The email of the user.
 */


/**
 * 
 * @typedef Params
 * @property {string} border - The border class for the card.
 * @property {string} shadowColor - The shadow color class for the card.
 * @property {string} cardColor - The background color class for the card.
 * @property {string} idCard - The ID of the card to be displayed.
 * @property {user} user - The user object containing user details.
 * 
 */



/**
 * 
 * @param {Params} params
 * @returns 
 */
export function createCard({ border, shadowColor, cardColor, idCard, user }) {
    console.log(user, border, shadowColor, cardColor, idCard);

    return `
        <div class="cardUser">
            <div class="block w-full h-full">
                <div class="flex items-center justify-center max-w-[700px] mx-auto mt-16 flex-0">
                    <div class="relative z-[1000] w-full h-auto mx-auto md:aspect-[2/1]">
                        <div class="h-full opacity-100 isolate md:aspect-[2/1]">
                            <div class="h-full">
                                <div
                                    class="atropos block w-full h-auto mx-auto md:aspect-[2/1] [box-sizing:border-box] atropos-rotate-touch">
                                    <span class="atropos-scale"
                                        style="transform: translate3d(0px, 0px, 0px); transition-duration: 300ms;"><span
                                            class="atropos-rotate"
                                            style="transition-duration: 300ms; transform: translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg);"><span
                                                class="atropos-inner backdrop-blur-xl rounded-[60px]">
                                                <div
                                                    class="block h-full overflow-hidden opacity-100 rounded-[60px] border p-5 aspect-none w-full md:aspect-[2/1] ${border} ${shadowColor} transition duration-400 ease-in-out">
                                                    <div
                                                        class="relative h-full overflow-hidden border rounded-[40px] grid md:flex ${cardColor} border-red-300/20 transition duration-500 ease-in-out">
                                                        <div
                                                            class="absolute w-1/2 rotate-45 h-[300%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#41b3ff00] via-[#b0a9ff13] to-[#41b3ff00]">
                                                        </div><span
                                                            class="h-full font-mono text-center text-white font-bold ticket-dash-border-top row-[3/4] px-4 py-4 md:py-0 text-4xl md:px-4 md:text-3xl md:[writing-mode:vertical-lr] md:ticket-dash-border">#${idCard}</span>
                                                        <div
                                                            class="-rotate-12 md:w-auto row-[2/3] mb-8 md:mb-0 left-0 mx-auto md:mx-0 h-32 md:h-[40%] relative flex justify-center w-full md:block bottom-0 md:left-[25%] md:bottom-[20%] md:absolute">
                                                            </div>
                                                        <div
                                                            class="z-10 grid w-full h-auto md:h-full pt-5 md:pt-0 grid-rows-2">
                                                            <div class="grid md:grid-cols-2 m-4">
                                                                <div class="h-max">
                                                                    <div class="flex items-center justify-center md:justify-start gap-4 p-5 flex-col md:flex-row">
                                                                        <img src="/design.png" class="w-20 mx-auto md:mx-0">
                                                                        
                                                                        <img class="w-14 h-14 p-1 rounded-full ring-2 ring-white " src="https://api.dicebear.com/9.x/big-smile/svg?seed=${user.nombre}" alt="Bordered avatar">

                                                                    </div>
                                                                    <div class="flex text-white  flex-col md:justify-start p-5 ">
                                                                        <p class="text-white">
                                                                            <span class="font-bold">
                                                                                Nombre:  
                                                                            </span> 
                                                                            <span class="font-medium">
                                                                                ${user.nombre}
                                                                            </span>
                                                                        <p/>
                                                                        <p class="text-white">
                                                                            <span class="font-bold">
                                                                                Carrera:  
                                                                            </span> 
                                                                            <span class="font-medium">
                                                                                ${user.carrera}
                                                                            </span>
                                                                        <p/>

                                                                    </div>

                                                                    <div
                                                                        class="flex justify-start gap-4 text-white p-5 flex-col md:items-start md:flex-row md:p-6 items-center text-center md:text-left">
                                                                        <div>
                                                                            <p class="text-xl text-white font-bold"><span
                                                                                    class="opacity-75 text-white">#</span>romanCard
                                                                            </p><span
                                                                                class="block text-sm font-normal w-max text-white/60">Tecnologia para el acceso a las plataformas academicas</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="gap-4 p-5 flex justify-items-end  md:block flex-col-reverse md:flex-row">
                                                                    <img src="/uas.png" class="w-15">
                                                                    <time datetime="${new Date().toISOString()}"
                                                                        class="block mt-2 ml-auto font-bold text-white md:ml-0 text-center mr-auto md:mr-0 md:text-right">${new Date().toDateString()}<span
                                                                            class="block text-sm font-normal text-white/60 animate-blurred-fade-in">${new Intl.DateTimeFormat('es-MX', {
                                                                                hour12: false,
                                                                                hour: '2-digit',
                                                                                minute: '2-digit',
                                                                                second: '2-digit'
                                                                            }).format(new Date())} GTM</span><span
                                                                            });}</span></time></div>
                                                            </div>
                                                            <div
                                                                class="flex flex-row-reverse items-center w-auto h-auto gap-2 mx-auto md:ml-0 justify-center md:justify-self-end md:mr-4">
                                                            </div>
                                                            <div
                                                                class="grid self-end gap-4 grid-cols-1 md:grid-cols-[1fr_auto] md:grid-rows-[auto_auto] md:gap-0">
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div><span class="atropos-highlight"
                                                    style="transform: translate3d(0px, 0px, 0px); transition-duration: 300ms; opacity: 0;"></span>
                                            </span><span class=""
                                                style="transform: translate3d(0px, 0px, -50px) scale(1); transition-duration: 300ms;"></span></span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

}