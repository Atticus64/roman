
export function createCard({ border, shadowColor, cardColor, idCard }) {

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
                                                            class="z-10 grid w-full h-auto md:h-full pt-5 md:pt-0 grid-rows-[1fr_auto] md:grid-rows-2">
                                                            <div class="grid md:grid-cols-2">
                                                                <div class="h-max">
                                                                    <div
                                                                        class="flex justify-start gap-4 text-white gap-y-2 p-5 flex-col md:items-start md:flex-row md:p-6 items-center text-center md:text-left">
                                                                        <div>
                                                                            <p class="text-xl font-bold"><span
                                                                                    class="opacity-75 text-midu-primary">#</span>romanCard
                                                                            </p><span
                                                                                class="block text-sm font-normal w-max text-white/60">Evento
                                                                                de Programación Gratuito</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="gap-4 p-5 flex justify-items-end  md:block flex-col-reverse md:flex-row">
                                                                    <img src="/uas.png" class="w-15">
                                                                    <time datetime="${new Date().toISOString()}"
                                                                        class="block mt-2 ml-auto font-bold text-white md:ml-0 text-center mr-auto md:mr-0 md:text-right">${new Date().toDateString()}<span
                                                                            class="block text-sm font-normal text-white/60 animate-blurred-fade-in">${new Intl.DateTimeFormat('en-GB', {
                                                                                timeZone: 'UTC',
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
                                                                
                                                                </div><a href="https://www.twitch.tv/midudev"
                                                                    target="_blank" rel="nofollow"
                                                                    class="flex items-center justify-self-end justify-end gap-2 p-5 font-bold text-white w-max hover:text-[#b9a3e3] transition-colors pt-0 text-md md:text-base mx-auto md:mx-0 md:py-0 md:h-max md:row-[1/2] md:col-[1/3]"><svg
                                                                        width="2400" height="2800"
                                                                        viewBox="0 0 2400 2800" fill="none"
                                                                        class="h-auto w-3.5"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <g clip-path="url(#clip0_33_542)">
                                                                            <path
                                                                                d="M500 0L0 500V2300H600V2800L1100 2300H1500L2400 1400V0H500ZM2200 1300L1800 1700H1400L1050 2050V1700H600V200H2200V1300Z"
                                                                                fill="currentColor"></path>
                                                                            <path
                                                                                d="M1700 550H1900V1150H1700V550ZM1150 550H1350V1150H1150V550Z"
                                                                                fill="currentColor"></path>
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_33_542">
                                                                                <rect width="2400" height="2800"
                                                                                    fill="currentColor"></rect>
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>twitch.tv/midudev</a>
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