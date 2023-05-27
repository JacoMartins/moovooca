import Head from "next/head"
import { useRouter } from "next/router"
import { GlobalMain } from "../../styles/global"
import Header from "../../components/Header"
import { AccordionItem, BodyContainer, ProfileNavButton } from "../../styles/pages/perfil"
import ProfileButton from "../../components/ProfileButton"
import { Bus, CaretDown, CaretUp, ChartLineUp, LineSegments, MapPin, Path, PencilSimple, Trash } from "@phosphor-icons/react"
import * as Accordion from '@radix-ui/react-accordion'

export default function Perfil() {
  const router = useRouter()
  const { nome_usuario } = router.query

  function goTo(path: string) {
    router.push(path)
  }

  return (
    <>
      <Head>
        <title>Moovooca</title>
        <meta name='description' content='Perfil ' />
      </Head>
      <GlobalMain>
        <Header />
        <BodyContainer>
          <div className="profileSidebar">
            <div className="profileContainer">
              <ProfileButton mainName="" weight="thin" style={{
                height: '180px',
                width: '180px',
                cursor: 'default',
                border: 'solid 3px rgba(0, 0, 0, 0.2)'
              }} />
              <div className="textContainer">
                <h2>Vitória</h2>
                <span>@vitoriaonibus</span>
              </div>
            </div>

            <span>
              Nossas linhas de ônibus provém serviços desde 1994, sendo uma das maiores empresas automobilisticas do Ceará.
            </span>

            <button>
              Editar perfil
            </button>

            <div className="locationContainer">
              <MapPin size={16} weight="fill" color="rgba(0, 0, 0, 0.5)" />
              Ceará, Brasil.
            </div>
          </div>

          <div className="mainContainer">
            <div className="profileNav">
              <div className="profileNavContainer">
                <ProfileNavButton selected={true}>
                  <LineSegments size={18} weight="regular" />
                  Linhas
                </ProfileNavButton>

                <ProfileNavButton selected={false}>
                  <Path size={18} weight="regular" />
                  Viagens
                </ProfileNavButton>

                <ProfileNavButton selected={false}>
                  <ChartLineUp size={18} weight="regular" />
                  Dashboard
                </ProfileNavButton>
              </div>
            </div>

            <div className="contentContainer">
              <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
                <Accordion.Item className="AccordionItem" value="item-1">
                  <Accordion.AccordionTrigger className="AccordionTrigger">
                    <div className="lineTriggerContainer">
                      <div className='firstContainer'>
                        <span className="busCode"><Bus size={20} color="rgba(0, 0, 0, 0.8)" weight="regular" />472</span>
                        <div className="busTitleContainer">
                          <span>Maraponga / Redenção</span>
                          <span>Linha Privada - Coletivo</span>
                        </div>
                      </div>
                      <div className='lastContainer'>
                        <div className="infoTextContainer">
                          <span>Passa próximo de</span>
                          <a>Campus Uece</a>
                        </div>
                        <CaretDown className="caretDown" size={12} weight="fill" />
                      </div>
                    </div>
                  </Accordion.AccordionTrigger>
                  <Accordion.AccordionContent className="AccordionContent">
                    <div className="AccordionContentContainer">
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </div>
                  </Accordion.AccordionContent>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          </div>
        </BodyContainer>
      </GlobalMain>
    </>
  )
}