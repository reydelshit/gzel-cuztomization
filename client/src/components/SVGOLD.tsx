import React from 'react';

const SVGOLD = () => {
  return (
    <div>
      {/* <svg
                  className="rotate-[270deg]"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="1020"
                  height="768"
                  viewBox="0 0 1024.5 576"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.0"
                >
                  <Def />
                  <SvgImage />

                  <g clip-path="url(#d4c77b43be)">
                    <g clip-path="url(#0061248859)">
                      <PlotHoveredContainer
                        selectedPatay={selectedPatay}
                        id="PLOT_1"
                        d="M 829.527344 57.710938 L 871.144531 57.710938 L 871.144531 96.882812 L 829.527344 96.882812 Z M 829.527344 57.710938"
                        fill={
                          selectedPatay.trim().toUpperCase() === 'PLOT_1'
                            ? 'orange'
                            : '#c1ff72'
                        }
                        onClick={() => handleAddPlot('PLOT_1')}
                      />
                    </g>
                  </g>

                  <g clip-path="url(#07af203f5f)">
                    <g clip-path="url(#62f893b60a)">
                      <PlotHoveredContainer
                        selectedPatay={selectedPatay}
                        id="PLOT_2"
                        d="M 829.527344 101.585938 L 871.144531 101.585938 L 871.144531 140.753906 L 829.527344 140.753906 Z M 829.527344 101.585938 "
                        fill={
                          selectedPatay.trim().toUpperCase() === 'PLOT_2'
                            ? 'orange'
                            : '#c1ff72'
                        }
                        onClick={() => handleAddPlot('PLOT_2')}
                      />
                    </g>
                  </g>
                  <g clip-path="url(#58f0c870e3)">
                    <g clip-path="url(#6aad372140)">
                      <PlotHoveredContainer
                        selectedPatay={selectedPatay}
                        id="PLOT_3"
                        fill={
                          selectedPatay.trim().toUpperCase() === 'PLOT_3'
                            ? 'orange'
                            : '#c1ff72'
                        }
                        d="M 829.527344 145.457031 L 871.144531 145.457031 L 871.144531 184.625 L 829.527344 184.625 Z M 829.527344 145.457031 "
                        onClick={() => handleAddPlot('PLOT_3')}
                      />
                    </g>
                  </g>
                  <g clip-path="url(#b6568a026a)">
                    <g clip-path="url(#78cd0a2db3)">
                      <path
                        fill="#c1ff72"
                        d="M 777.90625 57.710938 L 819.523438 57.710938 L 819.523438 96.882812 L 777.90625 96.882812 Z M 777.90625 57.710938 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#76efc0c8da)">
                    <g clip-path="url(#fa65c4e3a7)">
                      <path
                        fill="#c1ff72"
                        d="M 777.90625 101.585938 L 819.523438 101.585938 L 819.523438 140.753906 L 777.90625 140.753906 Z M 777.90625 101.585938 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#f85fc2ee05)">
                    <g clip-path="url(#e23edd9a22)">
                      <path
                        fill="#c1ff72"
                        d="M 777.90625 145.457031 L 819.523438 145.457031 L 819.523438 184.625 L 777.90625 184.625 Z M 777.90625 145.457031 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#ca7d73bd73)">
                    <g clip-path="url(#2fb916ce87)">
                      <path
                        fill="#c1ff72"
                        d="M 726.554688 57.710938 L 768.171875 57.710938 L 768.171875 96.882812 L 726.554688 96.882812 Z M 726.554688 57.710938 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#5573228695)">
                    <g clip-path="url(#f9804db24b)">
                      <path
                        fill="#c1ff72"
                        d="M 726.554688 101.585938 L 768.171875 101.585938 L 768.171875 140.753906 L 726.554688 140.753906 Z M 726.554688 101.585938 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#dfa2bc209a)">
                    <g clip-path="url(#f3884abb1f)">
                      <path
                        fill="#c1ff72"
                        d="M 726.554688 145.457031 L 768.171875 145.457031 L 768.171875 184.625 L 726.554688 184.625 Z M 726.554688 145.457031 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#60b0d62524)">
                    <g clip-path="url(#4edf36224c)">
                      <path
                        fill="#c1ff72"
                        d="M 674.929688 57.710938 L 716.550781 57.710938 L 716.550781 96.882812 L 674.929688 96.882812 Z M 674.929688 57.710938 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#de7cea27c7)">
                    <g clip-path="url(#84e30b011a)">
                      <path
                        fill="#c1ff72"
                        d="M 674.929688 101.585938 L 716.550781 101.585938 L 716.550781 140.753906 L 674.929688 140.753906 Z M 674.929688 101.585938 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#0a6b4d56e5)">
                    <g clip-path="url(#a851c938a5)">
                      <path
                        fill="#c1ff72"
                        d="M 674.929688 145.457031 L 716.550781 145.457031 L 716.550781 184.625 L 674.929688 184.625 Z M 674.929688 145.457031 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#7ff6bbd1ad)">
                    <g clip-path="url(#21be06d564)">
                      <g clip-path="url(#0cc1dd0999)">
                        <path
                          fill="#c1ff72"
                          d="M 594.917969 111.695312 L 594.140625 153.304688 L 554.976562 152.574219 L 555.753906 110.964844 Z M 594.917969 111.695312 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#b11bcf8a89)">
                    <g clip-path="url(#35cd3e65fe)">
                      <g clip-path="url(#a25f3fd38d)">
                        <path
                          fill="#c1ff72"
                          d="M 551.050781 110.875 L 550.273438 152.488281 L 511.109375 151.753906 L 511.886719 110.144531 Z M 551.050781 110.875 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#7626ad3e9d)">
                    <g clip-path="url(#38c18b732b)">
                      <g clip-path="url(#f2d8b8b56a)">
                        <path
                          fill="#c1ff72"
                          d="M 507.1875 110.054688 L 506.410156 151.667969 L 467.246094 150.9375 L 468.023438 109.324219 Z M 507.1875 110.054688 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#4a90e93a1e)">
                    <g clip-path="url(#ca92bfe024)">
                      <g clip-path="url(#103524303b)">
                        <path
                          fill="#c1ff72"
                          d="M 595.878906 60.082031 L 595.101562 101.691406 L 555.9375 100.960938 L 556.714844 59.351562 Z M 595.878906 60.082031 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#ad6ec44b45)">
                    <g clip-path="url(#d31e029bb4)">
                      <g clip-path="url(#884bb3ac71)">
                        <path
                          fill="#c1ff72"
                          d="M 552.015625 59.261719 L 551.238281 100.875 L 512.074219 100.144531 L 512.851562 58.53125 Z M 552.015625 59.261719 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#ea81b553a9)">
                    <g clip-path="url(#e5a32f6e00)">
                      <g clip-path="url(#5e24120c5e)">
                        <path
                          fill="#c1ff72"
                          d="M 508.152344 58.445312 L 507.375 100.054688 L 468.210938 99.324219 L 468.988281 57.710938 Z M 508.152344 58.445312 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#75542fa7a4)">
                    <g clip-path="url(#e94f7b6f63)">
                      <path
                        fill="#c1ff72"
                        d="M 369.175781 46.6875 L 410.792969 46.6875 L 410.792969 85.855469 L 369.175781 85.855469 Z M 369.175781 46.6875 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#bf971f5cee)">
                    <g clip-path="url(#7ff8c0573f)">
                      <path
                        fill="#c1ff72"
                        d="M 369.175781 90.558594 L 410.792969 90.558594 L 410.792969 129.730469 L 369.175781 129.730469 Z M 369.175781 90.558594 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#9d26a2cdb7)">
                    <g clip-path="url(#c10b23e19e)">
                      <path
                        fill="#c1ff72"
                        d="M 369.175781 134.429688 L 410.792969 134.429688 L 410.792969 173.601562 L 369.175781 173.601562 Z M 369.175781 134.429688 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#299ce64f9c)">
                    <g clip-path="url(#2b7d360580)">
                      <path
                        fill="#c1ff72"
                        d="M 317.554688 46.6875 L 359.171875 46.6875 L 359.171875 85.855469 L 317.554688 85.855469 Z M 317.554688 46.6875 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#fa58ae8391)">
                    <g clip-path="url(#a41f7e24b1)">
                      <path
                        fill="#c1ff72"
                        d="M 317.554688 90.558594 L 359.171875 90.558594 L 359.171875 129.730469 L 317.554688 129.730469 Z M 317.554688 90.558594 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#ede46eab38)">
                    <g clip-path="url(#cf55b4198d)">
                      <path
                        fill="#c1ff72"
                        d="M 317.554688 134.429688 L 359.171875 134.429688 L 359.171875 173.601562 L 317.554688 173.601562 Z M 317.554688 134.429688 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#09f5df9e40)">
                    <g clip-path="url(#73c2035416)">
                      <path
                        fill="#c1ff72"
                        d="M 553.3125 192.167969 L 594.929688 192.167969 L 594.929688 231.335938 L 553.3125 231.335938 Z M 553.3125 192.167969 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#77aff9cefb)">
                    <g clip-path="url(#a901d7aa09)">
                      <path
                        fill="#c1ff72"
                        d="M 553.3125 236.039062 L 594.929688 236.039062 L 594.929688 275.210938 L 553.3125 275.210938 Z M 553.3125 236.039062 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#6f2a65d238)">
                    <g clip-path="url(#9913452405)">
                      <path
                        fill="#c1ff72"
                        d="M 553.3125 279.910156 L 594.929688 279.910156 L 594.929688 319.082031 L 553.3125 319.082031 Z M 553.3125 279.910156 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#902c733165)">
                    <g clip-path="url(#04abf947fc)">
                      <path
                        fill="#c1ff72"
                        d="M 501.691406 192.167969 L 543.308594 192.167969 L 543.308594 231.335938 L 501.691406 231.335938 Z M 501.691406 192.167969 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#95f4867907)">
                    <g clip-path="url(#55cf8cd1c9)">
                      <path
                        fill="#c1ff72"
                        d="M 501.691406 236.039062 L 543.308594 236.039062 L 543.308594 275.210938 L 501.691406 275.210938 Z M 501.691406 236.039062 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#dd291b24ea)">
                    <g clip-path="url(#44a6717acb)">
                      <path
                        fill="#c1ff72"
                        d="M 501.691406 279.910156 L 543.308594 279.910156 L 543.308594 319.082031 L 501.691406 319.082031 Z M 501.691406 279.910156 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#9f824d4dda)">
                    <g clip-path="url(#9944765197)">
                      <path
                        fill="#c1ff72"
                        d="M 239.558594 47.503906 L 281.175781 47.503906 L 281.175781 86.675781 L 239.558594 86.675781 Z M 239.558594 47.503906 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#de18a59a4c)">
                    <g clip-path="url(#adc079b5e0)">
                      <path
                        fill="#c1ff72"
                        d="M 239.558594 91.378906 L 281.175781 91.378906 L 281.175781 130.546875 L 239.558594 130.546875 Z M 239.558594 91.378906 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#1a5071349e)">
                    <g clip-path="url(#579e6d9fa5)">
                      <path
                        fill="#c1ff72"
                        d="M 239.558594 135.25 L 281.175781 135.25 L 281.175781 174.417969 L 239.558594 174.417969 Z M 239.558594 135.25 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#57d77e8abb)">
                    <g clip-path="url(#45f6d11c8d)">
                      <path
                        fill="#c1ff72"
                        d="M 187.9375 47.503906 L 229.554688 47.503906 L 229.554688 86.675781 L 187.9375 86.675781 Z M 187.9375 47.503906 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#709ecededd)">
                    <g clip-path="url(#6819d59a5f)">
                      <path
                        fill="#c1ff72"
                        d="M 187.9375 91.378906 L 229.554688 91.378906 L 229.554688 130.546875 L 187.9375 130.546875 Z M 187.9375 91.378906 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#0bad0fab39)">
                    <g clip-path="url(#83d899b0e3)">
                      <path
                        fill="#c1ff72"
                        d="M 187.9375 135.25 L 229.554688 135.25 L 229.554688 174.417969 L 187.9375 174.417969 Z M 187.9375 135.25 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#3e2adce30d)">
                    <g clip-path="url(#285077597a)">
                      <path
                        fill="#c1ff72"
                        d="M 234.550781 309.058594 L 276.171875 309.058594 L 276.171875 348.230469 L 234.550781 348.230469 Z M 234.550781 309.058594 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#6655ae2c20)">
                    <g clip-path="url(#a746ec4a8b)">
                      <path
                        fill="#c1ff72"
                        d="M 234.550781 352.933594 L 276.171875 352.933594 L 276.171875 392.101562 L 234.550781 392.101562 Z M 234.550781 352.933594 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#c3e7702837)">
                    <g clip-path="url(#8ffdd78da1)">
                      <path
                        fill="#c1ff72"
                        d="M 234.550781 396.804688 L 276.171875 396.804688 L 276.171875 435.976562 L 234.550781 435.976562 Z M 234.550781 396.804688 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>

                  <g clip-path="url(#48de75331b)">
                    <g clip-path="url(#ea81af9419)">
                      <path
                        fill="#c1ff72"
                        d="M 182.929688 309.058594 L 224.550781 309.058594 L 224.550781 348.230469 L 182.929688 348.230469 Z M 182.929688 309.058594 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#54c3b41814)">
                    <g clip-path="url(#558aa16b91)">
                      <path
                        fill="#c1ff72"
                        d="M 182.929688 352.933594 L 224.550781 352.933594 L 224.550781 392.101562 L 182.929688 392.101562 Z M 182.929688 352.933594 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#22d199ef2a)">
                    <g clip-path="url(#c280a4ec1f)">
                      <path
                        fill="#c1ff72"
                        d="M 182.929688 396.804688 L 224.550781 396.804688 L 224.550781 435.976562 L 182.929688 435.976562 Z M 182.929688 396.804688 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#c3449ec3bf)">
                    <g clip-path="url(#ed414f0bfe)">
                      <g clip-path="url(#f3564d1b91)">
                        <path
                          fill="#c1ff72"
                          d="M 267.007812 495.898438 L 265.753906 537.5 L 226.601562 536.316406 L 227.855469 494.71875 Z M 267.007812 495.898438 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#5da08f4eb4)">
                    <g clip-path="url(#2e911b1375)">
                      <g clip-path="url(#465cb271ac)">
                        <path
                          fill="#c1ff72"
                          d="M 223.15625 494.574219 L 221.902344 536.175781 L 182.75 534.992188 L 184.003906 493.394531 Z M 223.15625 494.574219 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#77a7bfb568)">
                    <g clip-path="url(#641253d019)">
                      <g clip-path="url(#2877839dac)">
                        <path
                          fill="#c1ff72"
                          d="M 179.304688 493.253906 L 178.050781 534.851562 L 138.898438 533.671875 L 140.152344 492.070312 Z M 179.304688 493.253906 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#e092a8d4f0)">
                    <g clip-path="url(#9597a0d49f)">
                      <g clip-path="url(#568901bb28)">
                        <path
                          fill="#c1ff72"
                          d="M 268.566406 444.300781 L 267.308594 485.902344 L 228.15625 484.71875 L 229.414062 443.121094 Z M 268.566406 444.300781 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#ffa324f4a5)">
                    <g clip-path="url(#c8ee3609b1)">
                      <g clip-path="url(#f1a46028d9)">
                        <path
                          fill="#c1ff72"
                          d="M 224.714844 442.976562 L 223.457031 484.578125 L 184.304688 483.394531 L 185.5625 441.796875 Z M 224.714844 442.976562 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#9328eabf62)">
                    <g clip-path="url(#b0d5457baf)">
                      <g clip-path="url(#f21711a7d8)">
                        <path
                          fill="#c1ff72"
                          d="M 180.863281 441.65625 L 179.605469 483.253906 L 140.453125 482.074219 L 141.707031 440.472656 Z M 180.863281 441.65625 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#a108c9b0d6)">
                    <g clip-path="url(#bde59a2077)">
                      <g clip-path="url(#6d1bf79d8e)">
                        <path
                          fill="#c1ff72"
                          d="M 272.015625 233.621094 L 270.761719 275.21875 L 231.609375 274.039062 L 232.863281 232.4375 Z M 272.015625 233.621094 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#8fddc738b0)">
                    <g clip-path="url(#34b80fd842)">
                      <g clip-path="url(#616547a1ca)">
                        <path
                          fill="#c1ff72"
                          d="M 228.164062 232.296875 L 226.910156 273.898438 L 187.753906 272.714844 L 189.011719 231.117188 Z M 228.164062 232.296875 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#638d88fe04)">
                    <g clip-path="url(#f3950be787)">
                      <g clip-path="url(#bcfbdeef33)">
                        <path
                          fill="#c1ff72"
                          d="M 184.3125 230.972656 L 183.054688 272.574219 L 143.902344 271.394531 L 145.160156 229.792969 Z M 184.3125 230.972656 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#a1a118a6e1)">
                    <g clip-path="url(#8590028040)">
                      <g clip-path="url(#085d8b4e87)">
                        <path
                          fill="#c1ff72"
                          d="M 273.574219 182.023438 L 272.316406 223.621094 L 233.164062 222.441406 L 234.417969 180.839844 Z M 273.574219 182.023438 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#aacaa97fc6)">
                    <g clip-path="url(#94bef07aca)">
                      <g clip-path="url(#1550e37fc9)">
                        <path
                          fill="#c1ff72"
                          d="M 229.71875 180.699219 L 228.464844 222.300781 L 189.3125 221.117188 L 190.566406 179.519531 Z M 229.71875 180.699219 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#50a9bfa1ad)">
                    <g clip-path="url(#b338c75bf2)">
                      <g clip-path="url(#ef43d1e3f3)">
                        <path
                          fill="#c1ff72"
                          d="M 187.519531 185.808594 L 186.265625 227.410156 L 147.113281 226.226562 L 148.367188 184.628906 Z M 187.519531 185.808594 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#54c7fa3f00)">
                    <g clip-path="url(#0fbcf4ca2c)">
                      <g clip-path="url(#351a848800)">
                        <path
                          fill="#c1ff72"
                          d="M 177.746094 374.800781 L 176.492188 416.402344 L 137.339844 415.21875 L 138.59375 373.621094 Z M 177.746094 374.800781 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#d07f89f4d2)">
                    <g clip-path="url(#f481132467)">
                      <g clip-path="url(#16db09ee40)">
                        <path
                          fill="#c1ff72"
                          d="M 133.894531 373.476562 L 132.640625 415.078125 L 93.488281 413.894531 L 94.742188 372.296875 Z M 133.894531 373.476562 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#204f7fde8a)">
                    <g clip-path="url(#5262b5fec6)">
                      <g clip-path="url(#d0a1adb5ed)">
                        <path
                          fill="#c1ff72"
                          d="M 90.042969 372.15625 L 88.789062 413.753906 L 49.636719 412.574219 L 50.890625 370.972656 Z M 90.042969 372.15625 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#97ece8f909)">
                    <g clip-path="url(#81771f11a7)">
                      <g clip-path="url(#c737875c31)">
                        <path
                          fill="#c1ff72"
                          d="M 179.304688 323.203125 L 178.050781 364.804688 L 138.898438 363.621094 L 140.152344 322.023438 Z M 179.304688 323.203125 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#fc24374c46)">
                    <g clip-path="url(#b3a27121ca)">
                      <g clip-path="url(#e7f73851f6)">
                        <path
                          fill="#c1ff72"
                          d="M 135.453125 321.878906 L 134.199219 363.480469 L 95.042969 362.296875 L 96.300781 320.699219 Z M 135.453125 321.878906 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#b93bbd93fb)">
                    <g clip-path="url(#a56796708a)">
                      <g clip-path="url(#fc88555583)">
                        <path
                          fill="#c1ff72"
                          d="M 91.601562 320.554688 L 90.347656 362.15625 L 51.191406 360.976562 L 52.449219 319.375 Z M 91.601562 320.554688 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#dedf495ea7)">
                    <g clip-path="url(#363ca64619)">
                      <g clip-path="url(#eaffdf3361)">
                        <path
                          fill="#c1ff72"
                          d="M 186.199219 98.296875 L 184.945312 139.894531 L 145.789062 138.714844 L 147.046875 97.113281 Z M 186.199219 98.296875 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#d3e8c8b75f)">
                    <g clip-path="url(#7928c3a285)">
                      <g clip-path="url(#7c1c6c19a3)">
                        <path
                          fill="#c1ff72"
                          d="M 142.347656 96.972656 L 141.089844 138.574219 L 101.9375 137.390625 L 103.195312 95.792969 Z M 142.347656 96.972656 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#6af77d04cb)">
                    <g clip-path="url(#ed279a7ac6)">
                      <g clip-path="url(#0de1dbb3f6)">
                        <path
                          fill="#c1ff72"
                          d="M 98.496094 95.648438 L 97.238281 137.25 L 58.085938 136.066406 L 59.34375 94.46875 Z M 98.496094 95.648438 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#70d028e90b)">
                    <g clip-path="url(#e43a5b024e)">
                      <g clip-path="url(#fe4f3e7f08)">
                        <path
                          fill="#c1ff72"
                          d="M 187.757812 46.699219 L 186.5 88.296875 L 147.347656 87.117188 L 148.601562 45.515625 Z M 187.757812 46.699219 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#9140301994)">
                    <g clip-path="url(#2949e12915)">
                      <g clip-path="url(#e2c4fb7d05)">
                        <path
                          fill="#c1ff72"
                          d="M 143.902344 45.375 L 142.648438 86.976562 L 103.496094 85.792969 L 104.75 44.195312 Z M 143.902344 45.375 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#1cbb9577c9)">
                    <g clip-path="url(#5fe138361d)">
                      <g clip-path="url(#b7361f34ef)">
                        <path
                          fill="#c1ff72"
                          d="M 100.050781 44.050781 L 98.796875 85.652344 L 59.644531 84.46875 L 60.898438 42.871094 Z M 100.050781 44.050781 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#a0ee17d446)">
                    <g clip-path="url(#2dba256bc7)">
                      <g clip-path="url(#cb03da8aa2)">
                        <path
                          fill="#c1ff72"
                          d="M 132.148438 478.6875 L 130.894531 520.289062 L 91.742188 519.105469 L 92.996094 477.507812 Z M 132.148438 478.6875 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#a5693ec15f)">
                    <g clip-path="url(#5b6795a7ac)">
                      <g clip-path="url(#465de106f6)">
                        <path
                          fill="#c1ff72"
                          d="M 91.671875 471.867188 L 90.414062 513.46875 L 51.261719 512.285156 L 52.515625 470.6875 Z M 91.671875 471.867188 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#1022b2685b)">
                    <g clip-path="url(#6f68262bc4)">
                      <g clip-path="url(#11af9072b1)">
                        <path
                          fill="#c1ff72"
                          d="M 138.898438 426.566406 L 137.640625 468.167969 L 98.488281 466.984375 L 99.746094 425.386719 Z M 138.898438 426.566406 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#ff0b17c721)">
                    <g clip-path="url(#618d125d09)">
                      <g clip-path="url(#7c94532246)">
                        <path
                          fill="#c1ff72"
                          d="M 95.046875 423.746094 L 93.789062 465.34375 L 54.636719 464.164062 L 55.890625 422.5625 Z M 95.046875 423.746094 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#7d63729d9d)">
                    <g clip-path="url(#23a6ddef35)">
                      <g clip-path="url(#2cd12822a5)">
                        <path
                          fill="#c1ff72"
                          d="M 575.351562 490.160156 L 574.097656 531.761719 L 534.945312 530.582031 L 536.199219 488.980469 Z M 575.351562 490.160156 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#4d0db14bc6)">
                    <g clip-path="url(#ffec673d83)">
                      <g clip-path="url(#505a3f5318)">
                        <path
                          fill="#c1ff72"
                          d="M 531.5 488.839844 L 530.246094 530.4375 L 491.09375 529.257812 L 492.347656 487.65625 Z M 531.5 488.839844 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#70519cc839)">
                    <g clip-path="url(#af99702870)">
                      <g clip-path="url(#ce0de0db1f)">
                        <path
                          fill="#c1ff72"
                          d="M 487.648438 487.515625 L 486.394531 529.113281 L 447.242188 527.933594 L 448.496094 486.332031 Z M 487.648438 487.515625 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#885d585318)">
                    <g clip-path="url(#9565b93729)">
                      <g clip-path="url(#edd0e5cbf5)">
                        <path
                          fill="#c1ff72"
                          d="M 576.910156 438.5625 L 575.652344 480.164062 L 536.5 478.980469 L 537.757812 437.382812 Z M 576.910156 438.5625 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#462213f469)">
                    <g clip-path="url(#7dc47a03fe)">
                      <g clip-path="url(#d452751e4f)">
                        <path
                          fill="#c1ff72"
                          d="M 533.058594 437.242188 L 531.800781 478.839844 L 492.648438 477.660156 L 493.90625 436.058594 Z M 533.058594 437.242188 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#a7813f5bd8)">
                    <g clip-path="url(#29516aaf74)">
                      <g clip-path="url(#6138a52ee0)">
                        <path
                          fill="#c1ff72"
                          d="M 489.207031 435.917969 L 487.949219 477.515625 L 448.796875 476.335938 L 450.050781 434.734375 Z M 489.207031 435.917969 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#398cd9a446)">
                    <g clip-path="url(#5fcffa5146)">
                      <g clip-path="url(#1b110d67ee)">
                        <path
                          fill="#c1ff72"
                          d="M 440.4375 483.863281 L 439.179688 525.460938 L 400.027344 524.28125 L 401.285156 482.679688 Z M 440.4375 483.863281 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#7e2fb7be9e)">
                    <g clip-path="url(#72e5ab0598)">
                      <g clip-path="url(#f66faf7eb1)">
                        <path
                          fill="#c1ff72"
                          d="M 396.585938 482.539062 L 395.328125 524.136719 L 356.175781 522.957031 L 357.429688 481.355469 Z M 396.585938 482.539062 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#608fa289ac)">
                    <g clip-path="url(#1e0446c873)">
                      <g clip-path="url(#e486adb8ba)">
                        <path
                          fill="#c1ff72"
                          d="M 352.734375 481.214844 L 351.476562 522.816406 L 312.324219 521.632812 L 313.578125 480.035156 Z M 352.734375 481.214844 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#caa9169c0a)">
                    <g clip-path="url(#c3ac863ab6)">
                      <g clip-path="url(#dca233af0f)">
                        <path
                          fill="#c1ff72"
                          d="M 441.992188 432.261719 L 440.738281 473.863281 L 401.585938 472.683594 L 402.839844 431.082031 Z M 441.992188 432.261719 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#8819e6f9e2)">
                    <g clip-path="url(#ec56d12de6)">
                      <g clip-path="url(#063d796c8d)">
                        <path
                          fill="#c1ff72"
                          d="M 398.140625 430.941406 L 396.886719 472.539062 L 357.734375 471.359375 L 358.988281 429.757812 Z M 398.140625 430.941406 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#e6679ddcd3)">
                    <g clip-path="url(#a308af851c)">
                      <g clip-path="url(#151968b71b)">
                        <path
                          fill="#c1ff72"
                          d="M 354.289062 429.617188 L 353.035156 471.21875 L 313.882812 470.035156 L 315.136719 428.433594 Z M 354.289062 429.617188 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#44ffa4d3cc)">
                    <g clip-path="url(#cc5a49416c)">
                      <g clip-path="url(#f23b3692d0)">
                        <path
                          fill="#c1ff72"
                          d="M 837.707031 491.484375 L 836.449219 533.085938 L 797.296875 531.902344 L 798.554688 490.304688 Z M 837.707031 491.484375 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#2387ceef3d)">
                    <g clip-path="url(#006736866b)">
                      <g clip-path="url(#e0162c0021)">
                        <path
                          fill="#c1ff72"
                          d="M 793.855469 490.160156 L 792.597656 531.761719 L 753.445312 530.582031 L 754.703125 488.980469 Z M 793.855469 490.160156 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#58e610005f)">
                    <g clip-path="url(#ae671b4fa4)">
                      <g clip-path="url(#675434a7ec)">
                        <path
                          fill="#c1ff72"
                          d="M 750.003906 488.839844 L 748.746094 530.4375 L 709.59375 529.257812 L 710.847656 487.65625 Z M 750.003906 488.839844 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#19e61c05f1)">
                    <g clip-path="url(#983ce641f2)">
                      <g clip-path="url(#7ff19391c9)">
                        <path
                          fill="#c1ff72"
                          d="M 839.261719 439.886719 L 838.007812 481.488281 L 798.855469 480.304688 L 800.109375 438.707031 Z M 839.261719 439.886719 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#7b66042a9d)">
                    <g clip-path="url(#4db474c1d5)">
                      <g clip-path="url(#200f13c678)">
                        <path
                          fill="#c1ff72"
                          d="M 795.410156 438.5625 L 794.15625 480.164062 L 755.003906 478.980469 L 756.257812 437.382812 Z M 795.410156 438.5625 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#9c43a6c6f3)">
                    <g clip-path="url(#c47ac9de7d)">
                      <g clip-path="url(#b78d1c676d)">
                        <path
                          fill="#c1ff72"
                          d="M 751.558594 437.242188 L 750.304688 478.839844 L 711.152344 477.660156 L 712.40625 436.058594 Z M 751.558594 437.242188 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#dd0a111192)">
                    <g clip-path="url(#250a08cd71)">
                      <g clip-path="url(#8c65abb042)">
                        <path
                          fill="#c1ff72"
                          d="M 654.167969 542.105469 L 612.570312 540.847656 L 613.75 501.695312 L 655.351562 502.949219 Z M 654.167969 542.105469 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#c2db477ed8)">
                    <g clip-path="url(#8609ca8245)">
                      <g clip-path="url(#c3a2b294b5)">
                        <path
                          fill="#c1ff72"
                          d="M 655.492188 498.253906 L 613.890625 496.996094 L 615.074219 457.84375 L 656.671875 459.097656 Z M 655.492188 498.253906 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#1470284b30)">
                    <g clip-path="url(#5c1afffbc3)">
                      <g clip-path="url(#1f3b1ad062)">
                        <path
                          fill="#c1ff72"
                          d="M 656.816406 454.398438 L 615.214844 453.144531 L 616.394531 413.992188 L 657.996094 415.246094 Z M 656.816406 454.398438 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#ce64788375)">
                    <g clip-path="url(#03bff23ae2)">
                      <g clip-path="url(#f84e5867a8)">
                        <path
                          fill="#c1ff72"
                          d="M 705.765625 543.660156 L 664.167969 542.40625 L 665.347656 503.253906 L 706.949219 504.507812 Z M 705.765625 543.660156 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#42a19e48bd)">
                    <g clip-path="url(#4689ef3e10)">
                      <g clip-path="url(#39adc3bc96)">
                        <path
                          fill="#c1ff72"
                          d="M 707.089844 499.808594 L 665.488281 498.554688 L 666.671875 459.402344 L 708.269531 460.65625 Z M 707.089844 499.808594 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#81cfdd5415)">
                    <g clip-path="url(#35db39be56)">
                      <g clip-path="url(#b5773aec44)">
                        <path
                          fill="#c1ff72"
                          d="M 708.414062 455.957031 L 666.8125 454.703125 L 667.996094 415.550781 L 709.59375 416.804688 Z M 708.414062 455.957031 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#57829435c1)">
                    <g clip-path="url(#32f916fe04)">
                      <g clip-path="url(#30f3b6baa4)">
                        <path
                          fill="#c1ff72"
                          d="M 376.058594 287.410156 L 375.128906 318.109375 L 346.238281 317.238281 L 347.164062 286.539062 Z M 376.058594 287.410156 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#c85c548b43)">
                    <g clip-path="url(#5b6d3453d0)">
                      <g clip-path="url(#60c8715e69)">
                        <path
                          fill="#c1ff72"
                          d="M 343.695312 286.433594 L 342.769531 317.132812 L 313.875 316.261719 L 314.800781 285.5625 Z M 343.695312 286.433594 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#b68d03aa2a)">
                    <g clip-path="url(#41a23563eb)">
                      <g clip-path="url(#d69936d862)">
                        <path
                          fill="#c1ff72"
                          d="M 377.207031 249.332031 L 376.28125 280.03125 L 347.386719 279.160156 L 348.3125 248.460938 Z M 377.207031 249.332031 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#6fc99ecb0a)">
                    <g clip-path="url(#69d23242bd)">
                      <g clip-path="url(#7cdeeab714)">
                        <path
                          fill="#c1ff72"
                          d="M 344.84375 248.355469 L 343.917969 279.054688 L 315.023438 278.183594 L 315.953125 247.484375 Z M 344.84375 248.355469 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#4465ae49ec)">
                    <g clip-path="url(#6ab0882b32)">
                      <g clip-path="url(#28d2d4c2da)">
                        <path
                          fill="#c1ff72"
                          d="M 383.242188 387.246094 L 382.316406 417.945312 L 353.421875 417.074219 L 354.351562 386.375 Z M 383.242188 387.246094 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#ebb9ab06a7)">
                    <g clip-path="url(#981ebd1bf8)">
                      <g clip-path="url(#092dd81061)">
                        <path
                          fill="#c1ff72"
                          d="M 350.882812 386.269531 L 349.957031 416.96875 L 321.0625 416.097656 L 321.988281 385.398438 Z M 350.882812 386.269531 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#cae29e887b)">
                    <g clip-path="url(#d46c1f5ac2)">
                      <g clip-path="url(#ea1c85eb2a)">
                        <path
                          fill="#c1ff72"
                          d="M 384.390625 349.167969 L 383.464844 379.867188 L 354.574219 378.996094 L 355.5 348.296875 Z M 384.390625 349.167969 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#3f787d08a3)">
                    <g clip-path="url(#b994f2709f)">
                      <g clip-path="url(#27f2ff3f81)">
                        <path
                          fill="#c1ff72"
                          d="M 352.03125 348.191406 L 351.105469 378.890625 L 322.210938 378.019531 L 323.136719 347.320312 Z M 352.03125 348.191406 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#8b09d0716b)">
                    <g clip-path="url(#88f3a67fb4)">
                      <g clip-path="url(#b1eb30f64a)">
                        <path
                          fill="#c1ff72"
                          d="M 694.574219 293.746094 L 693.648438 324.445312 L 664.753906 323.574219 L 665.679688 292.875 Z M 694.574219 293.746094 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#2dd4fea099)">
                    <g clip-path="url(#6415e86c0d)">
                      <g clip-path="url(#363f63129f)">
                        <path
                          fill="#c1ff72"
                          d="M 662.210938 292.769531 L 661.285156 323.46875 L 632.394531 322.597656 L 633.320312 291.898438 Z M 662.210938 292.769531 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#47b3700913)">
                    <g clip-path="url(#7fe03c658e)">
                      <g clip-path="url(#67c29f908b)">
                        <path
                          fill="#c1ff72"
                          d="M 695.722656 255.667969 L 694.796875 286.367188 L 665.902344 285.496094 L 666.828125 254.796875 Z M 695.722656 255.667969 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#84a736a4b1)">
                    <g clip-path="url(#9a9ef7ba0d)">
                      <g clip-path="url(#879101627d)">
                        <path
                          fill="#c1ff72"
                          d="M 663.359375 254.691406 L 662.433594 285.390625 L 633.542969 284.519531 L 634.46875 253.820312 Z M 663.359375 254.691406 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#39ecf06754)">
                    <g clip-path="url(#497b9f531b)">
                      <g clip-path="url(#70c9637df1)">
                        <path
                          fill="#c1ff72"
                          d="M 767.648438 296.515625 L 766.722656 327.214844 L 737.828125 326.34375 L 738.753906 295.644531 Z M 767.648438 296.515625 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#4c7a7a34cf)">
                    <g clip-path="url(#88a863cb94)">
                      <g clip-path="url(#bf376dae9b)">
                        <path
                          fill="#c1ff72"
                          d="M 735.285156 295.539062 L 734.359375 326.238281 L 705.46875 325.367188 L 706.394531 294.667969 Z M 735.285156 295.539062 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#951528a793)">
                    <g clip-path="url(#db85824534)">
                      <g clip-path="url(#cb1d6745ae)">
                        <path
                          fill="#c1ff72"
                          d="M 768.796875 258.4375 L 767.871094 289.136719 L 738.976562 288.265625 L 739.902344 257.566406 Z M 768.796875 258.4375 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#c71efa5966)">
                    <g clip-path="url(#3415e9213a)">
                      <g clip-path="url(#f7e821929c)">
                        <path
                          fill="#c1ff72"
                          d="M 736.4375 257.460938 L 735.507812 288.160156 L 706.617188 287.289062 L 707.542969 256.589844 Z M 736.4375 257.460938 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#85936e6d83)">
                    <g clip-path="url(#66c31faebf)">
                      <g clip-path="url(#e4190c70e4)">
                        <path
                          fill="#c1ff72"
                          d="M 842.972656 294.722656 L 842.042969 325.421875 L 813.152344 324.550781 L 814.078125 293.851562 Z M 842.972656 294.722656 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#fbf501a34d)">
                    <g clip-path="url(#bc66caaa51)">
                      <g clip-path="url(#6a5a21e8f2)">
                        <path
                          fill="#c1ff72"
                          d="M 810.609375 293.746094 L 809.683594 324.445312 L 780.789062 323.574219 L 781.714844 292.875 Z M 810.609375 293.746094 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#03172e5866)">
                    <g clip-path="url(#5db1879573)">
                      <g clip-path="url(#ac0cbc878c)">
                        <path
                          fill="#c1ff72"
                          d="M 844.121094 256.644531 L 843.195312 287.34375 L 814.300781 286.472656 L 815.226562 255.773438 Z M 844.121094 256.644531 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#5114f5c361)">
                    <g clip-path="url(#fe8bfc7daf)">
                      <g clip-path="url(#8463fedf59)">
                        <path
                          fill="#c1ff72"
                          d="M 811.757812 255.667969 L 810.832031 286.367188 L 781.9375 285.496094 L 782.867188 254.796875 Z M 811.757812 255.667969 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#fe06bee1fd)">
                    <g clip-path="url(#b21f161d6f)">
                      <g clip-path="url(#642135121c)">
                        <path
                          fill="#c1ff72"
                          d="M 137.339844 206.875 L 136.085938 248.476562 L 96.933594 247.292969 L 98.1875 205.695312 Z M 137.339844 206.875 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#f64db4c383)">
                    <g clip-path="url(#dd3c9a8465)">
                      <g clip-path="url(#3ed98b94ea)">
                        <path
                          fill="#c1ff72"
                          d="M 93.488281 205.554688 L 92.234375 247.152344 L 53.082031 245.972656 L 54.335938 204.371094 Z M 93.488281 205.554688 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#a420813341)">
                    <g clip-path="url(#7efa1f2c31)">
                      <g clip-path="url(#2b95d826c0)">
                        <path
                          fill="#c1ff72"
                          d="M 138.898438 155.277344 L 137.640625 196.878906 L 98.488281 195.695312 L 99.746094 154.097656 Z M 138.898438 155.277344 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#b215262096)">
                    <g clip-path="url(#b0632f0666)">
                      <g clip-path="url(#e5a7fa85f8)">
                        <path
                          fill="#c1ff72"
                          d="M 95.046875 153.953125 L 93.789062 195.554688 L 54.636719 194.375 L 55.890625 152.773438 Z M 95.046875 153.953125 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#aed6886c9f)">
                    <g clip-path="url(#1bf08257da)">
                      <g clip-path="url(#767fdfcd6a)">
                        <path
                          fill="#c1ff72"
                          d="M 183.097656 141.8125 L 182 178.203125 L 147.109375 177.148438 L 148.207031 140.757812 Z M 183.097656 141.8125 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#591d1d27c8)">
                    <g clip-path="url(#300f1d52ab)">
                      <path
                        fill="#c1ff72"
                        d="M 454.089844 196.007812 L 495.707031 196.007812 L 495.707031 235.179688 L 454.089844 235.179688 Z M 454.089844 196.007812 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#a457e4b325)">
                    <g clip-path="url(#193a7792ca)">
                      <path
                        fill="#c1ff72"
                        d="M 454.089844 239.878906 L 495.707031 239.878906 L 495.707031 279.050781 L 454.089844 279.050781 Z M 454.089844 239.878906 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#4917f12bad)">
                    <g clip-path="url(#05fbef30a4)">
                      <path
                        fill="#c1ff72"
                        d="M 402.46875 196.007812 L 444.085938 196.007812 L 444.085938 235.179688 L 402.46875 235.179688 Z M 402.46875 196.007812 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#818a83e614)">
                    <g clip-path="url(#5b4c517f1c)">
                      <path
                        fill="#c1ff72"
                        d="M 402.46875 239.878906 L 444.085938 239.878906 L 444.085938 279.050781 L 402.46875 279.050781 Z M 402.46875 239.878906 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#cac7c319cb)">
                    <g clip-path="url(#b12f16650d)">
                      <path
                        fill="#c1ff72"
                        d="M 454.089844 290.578125 L 495.707031 290.578125 L 495.707031 329.746094 L 454.089844 329.746094 Z M 454.089844 290.578125 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#f6f619b8e9)">
                    <g clip-path="url(#11853801b4)">
                      <path
                        fill="#c1ff72"
                        d="M 454.089844 334.449219 L 495.707031 334.449219 L 495.707031 373.621094 L 454.089844 373.621094 Z M 454.089844 334.449219 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#aa7babd659)">
                    <g clip-path="url(#990dc9246e)">
                      <path
                        fill="#c1ff72"
                        d="M 402.46875 290.578125 L 444.085938 290.578125 L 444.085938 329.746094 L 402.46875 329.746094 Z M 402.46875 290.578125 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#2e78781c0b)">
                    <g clip-path="url(#3669a700ef)">
                      <path
                        fill="#c1ff72"
                        d="M 402.46875 334.449219 L 444.085938 334.449219 L 444.085938 373.621094 L 402.46875 373.621094 Z M 402.46875 334.449219 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#27743ae793)">
                    <g clip-path="url(#d903336184)">
                      <path
                        fill="#c1ff72"
                        d="M 553.3125 326.578125 L 594.929688 326.578125 L 594.929688 365.75 L 553.3125 365.75 Z M 553.3125 326.578125 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#bbd06edf44)">
                    <g clip-path="url(#3cae12d490)">
                      <path
                        fill="#c1ff72"
                        d="M 553.3125 370.449219 L 594.929688 370.449219 L 594.929688 409.621094 L 553.3125 409.621094 Z M 553.3125 370.449219 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#d7734f657a)">
                    <g clip-path="url(#3fa5a4ab74)">
                      <path
                        fill="#c1ff72"
                        d="M 501.691406 326.578125 L 543.308594 326.578125 L 543.308594 365.75 L 501.691406 365.75 Z M 501.691406 326.578125 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#0495041a62)">
                    <g clip-path="url(#da785e22c0)">
                      <path
                        fill="#c1ff72"
                        d="M 501.691406 370.449219 L 543.308594 370.449219 L 543.308594 409.621094 L 501.691406 409.621094 Z M 501.691406 370.449219 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#235cbe5097)">
                    <g clip-path="url(#96e1234cdd)">
                      <path
                        fill="#c1ff72"
                        d="M 627.65625 53.71875 L 669.273438 53.71875 L 669.273438 92.890625 L 627.65625 92.890625 Z M 627.65625 53.71875 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#7dfee222d2)">
                    <g clip-path="url(#baeddb3925)">
                      <path
                        fill="#c1ff72"
                        d="M 627.65625 97.589844 L 669.273438 97.589844 L 669.273438 136.761719 L 627.65625 136.761719 Z M 627.65625 97.589844 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#30833fbd0e)">
                    <g clip-path="url(#38e4908f66)">
                      <path
                        fill="#c1ff72"
                        d="M 627.65625 141.460938 L 669.273438 141.460938 L 669.273438 180.632812 L 627.65625 180.632812 Z M 627.65625 141.460938 "
                        fill-opacity="1"
                        fill-rule="nonzero"
                      />
                    </g>
                  </g>
                  <g clip-path="url(#293b4c44c5)">
                    <g clip-path="url(#30cbed9a67)">
                      <g clip-path="url(#0255ccab42)">
                        <path
                          fill="#c1ff72"
                          d="M 459.925781 105.414062 L 459.148438 147.027344 L 419.984375 146.296875 L 420.761719 104.683594 Z M 459.925781 105.414062 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g clip-path="url(#90f51819dc)">
                    <g clip-path="url(#e144d1ac7d)">
                      <g clip-path="url(#161d77ba36)">
                        <path
                          fill="#c1ff72"
                          d="M 460.886719 53.804688 L 460.113281 95.414062 L 420.949219 94.683594 L 421.722656 53.074219 Z M 460.886719 53.804688 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                </svg> */}
    </div>
  );
};

export default SVGOLD;
