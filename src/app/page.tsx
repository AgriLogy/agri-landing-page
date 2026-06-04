"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Icon,
  useColorMode,
  useColorModeValue,
  IconButton,
  Link,
  Badge,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import {
  FaWrench,
  FaBuilding,
  FaSun,
  FaMoon,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaCheck,
  FaCog,
  FaMicrochip,
  FaCube,
  FaMobile,
  FaWifi,
  FaLeaf,
  FaChartLine,
  FaBell,
  FaWater,
} from "react-icons/fa";
import ContactSection from "./components/ContactSection";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const PARTNERS = [
  { src: "/partners/fao.png", alt: "FAO" },
  { src: "/partners/pole_digital.png", alt: "Pôle Digital" },
  { src: "/partners/deutsche.png", alt: "Deutsche" },
  { src: "/partners/tech-57.png", alt: "Tech 57" },
  { src: "/partners/siemens.png", alt: "Siemens" },
  { src: "/partners/royaumemaroc.png", alt: "Royaume du Maroc" },
  { src: "/partners/fromage.png", alt: "Fromage" },
];

const PLATFORM_FEATURES = [
  { key: "f1", src: "/platform/1.jpeg", alt: "Real-time data dashboard" },
  { key: "f2", src: "/platform/2.jpeg", alt: "Customizable dashboards" },
  { key: "f3", src: "/platform/1.jpeg", alt: "Automated alerts" },
  { key: "f4", src: "/platform/2.jpeg", alt: "Data and analytics" },
  { key: "f5", src: "/platform/1.jpeg", alt: "User management" },
  { key: "f6", src: "/platform/2.jpeg", alt: "White-label platform" },
];

export default function AgrilogyLanding() {
  const { colorMode, toggleColorMode } = useColorMode();
  const t = useTranslations();

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const partnersSectionBg = useColorModeValue("gray.50", "gray.800");
  const navLinkHoverBg = useColorModeValue("green.50", "whiteAlpha.100");
  const sectionAltBg = useColorModeValue("gray.50", "gray.800");
  const cardHoverShadow = useColorModeValue("card-hover", "dark-lg");

  const modernCard = {
    bg: cardBg,
    borderRadius: "2xl",
    boxShadow: "card",
    borderWidth: "1px",
    borderColor,
    overflow: "hidden" as const,
    transition: "all 0.2s ease",
    _hover: { boxShadow: cardHoverShadow, borderTopColor: "green.300" },
    borderTopWidth: "3px",
    borderTopColor: "transparent",
  };

  const NAV_BAR_HEIGHT = 64;
  const LOGO_HEIGHT = 88;

  const [activeSection, setActiveSection] = useState<string>("home");
  const [activePlatformFeature, setActivePlatformFeature] = useState(0);

  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "services",
      "products",
      "platform",
      "industry",
      "equipment",
      "partners",
      "contact",
    ];

    const handleScroll = () => {
      let current = "home";
      let minOffset = Number.POSITIVE_INFINITY;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const offset = Math.abs(rect.top - NAV_BAR_HEIGHT);

        if (offset < minOffset && rect.bottom > NAV_BAR_HEIGHT + 40) {
          minOffset = offset;
          current = id;
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box bg={bgColor} color={textColor} minH="100vh">
      {/* Header - fixed + blur, always visible while scrolling */}
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1500}
        h={`${NAV_BAR_HEIGHT}px`}
        minH={`${NAV_BAR_HEIGHT}px`}
        display="flex"
        alignItems="center"
        overflow="visible"
        bg={useColorModeValue("whiteAlpha.700", "blackAlpha.700")}
        backdropFilter="blur(14px)"
        sx={{ WebkitBackdropFilter: "blur(14px)" }}
        borderBottom="1px"
        borderColor={borderColor}
        boxShadow={useColorModeValue("sm", "dark-lg")}
        transition="box-shadow 0.2s, background 0.2s"
      >
        <Container maxW="7xl" h="full" py={0} display="flex" alignItems="center">
          <Flex justify="space-between" align="center" w="full" h="full">
            <Link href="#home" display="flex" alignItems="center" h="full" _hover={{ opacity: 0.9 }}>
              <Image
                src="/img/logo_Plan de travail 1.png"
                alt="Agrilogy Logo"
                h={{ base: "72px", md: `${LOGO_HEIGHT}px` }}
                w="auto"
                objectFit="contain"
                sx={{ marginTop: "0" }}
              />
            </Link>

            <HStack spacing={6} display={{ base: "none", md: "flex" }} as="nav">
              <Link
                href="#home"
                onClick={() => setActiveSection("home")}
                color={activeSection === "home" ? "green.600" : textColor}
                fontWeight={activeSection === "home" ? "semibold" : "normal"}
                fontSize="sm"
                py={2}
                px={2}
                borderRadius="md"
                borderBottomWidth={2}
                borderColor={activeSection === "home" ? "green.600" : "transparent"}
                bg={activeSection === "home" ? navLinkHoverBg : "transparent"}
                _hover={{ bg: navLinkHoverBg, color: "green.600" }}
                transition="background 0.2s, color 0.2s, border-color 0.2s"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="#about"
                onClick={() => setActiveSection("about")}
                fontSize="sm"
                color={activeSection === "about" ? "green.600" : textColor}
                opacity={activeSection === "about" ? 1 : 0.9}
                py={2}
                px={2}
                borderRadius="md"
                borderBottomWidth={2}
                borderColor={activeSection === "about" ? "green.600" : "transparent"}
                bg={activeSection === "about" ? navLinkHoverBg : "transparent"}
                _hover={{ bg: navLinkHoverBg, color: "green.600", opacity: 1 }}
                transition="background 0.2s, color 0.2s, border-color 0.2s"
              >
                {t("nav.about")}
              </Link>
              <Link
                href="#services"
                onClick={() => setActiveSection("services")}
                fontSize="sm"
                color={activeSection === "services" ? "green.600" : textColor}
                opacity={activeSection === "services" ? 1 : 0.9}
                py={2}
                px={2}
                borderRadius="md"
                borderBottomWidth={2}
                borderColor={activeSection === "services" ? "green.600" : "transparent"}
                bg={activeSection === "services" ? navLinkHoverBg : "transparent"}
                _hover={{ bg: navLinkHoverBg, color: "green.600", opacity: 1 }}
                transition="background 0.2s, color 0.2s, border-color 0.2s"
              >
                {t("nav.services")}
              </Link>
              <Link
                href="#products"
                onClick={() => setActiveSection("products")}
                fontSize="sm"
                color={activeSection === "products" ? "green.600" : textColor}
                opacity={activeSection === "products" ? 1 : 0.9}
                py={2}
                px={2}
                borderRadius="md"
                borderBottomWidth={2}
                borderColor={activeSection === "products" ? "green.600" : "transparent"}
                bg={activeSection === "products" ? navLinkHoverBg : "transparent"}
                _hover={{ bg: navLinkHoverBg, color: "green.600", opacity: 1 }}
                transition="background 0.2s, color 0.2s, border-color 0.2s"
              >
                {t("nav.products")}
              </Link>
              <Link
                href="#platform"
                onClick={() => setActiveSection("platform")}
                fontSize="sm"
                color={activeSection === "platform" ? "green.600" : textColor}
                opacity={activeSection === "platform" ? 1 : 0.9}
                py={2}
                px={2}
                borderRadius="md"
                borderBottomWidth={2}
                borderColor={activeSection === "platform" ? "green.600" : "transparent"}
                bg={activeSection === "platform" ? navLinkHoverBg : "transparent"}
                _hover={{ bg: navLinkHoverBg, color: "green.600", opacity: 1 }}
                transition="background 0.2s, color 0.2s, border-color 0.2s"
              >
                {t("nav.platform")}
              </Link>
              <Link
                href="#industry"
                onClick={() => setActiveSection("industry")}
                fontSize="sm"
                color={activeSection === "industry" ? "green.600" : textColor}
                opacity={activeSection === "industry" ? 1 : 0.9}
                py={2}
                px={2}
                borderRadius="md"
                borderBottomWidth={2}
                borderColor={activeSection === "industry" ? "green.600" : "transparent"}
                bg={activeSection === "industry" ? navLinkHoverBg : "transparent"}
                _hover={{ bg: navLinkHoverBg, color: "green.600", opacity: 1 }}
                transition="background 0.2s, color 0.2s, border-color 0.2s"
              >
                {t("nav.industry")}
              </Link>
              <Link
                href="#equipment"
                onClick={() => setActiveSection("equipment")}
                fontSize="sm"
                color={activeSection === "equipment" ? "green.600" : textColor}
                opacity={activeSection === "equipment" ? 1 : 0.9}
                py={2}
                px={2}
                borderRadius="md"
                borderBottomWidth={2}
                borderColor={activeSection === "equipment" ? "green.600" : "transparent"}
                bg={activeSection === "equipment" ? navLinkHoverBg : "transparent"}
                _hover={{ bg: navLinkHoverBg, color: "green.600", opacity: 1 }}
                transition="background 0.2s, color 0.2s, border-color 0.2s"
              >
                {t("nav.equipment")}
              </Link>
              <Link
                href="#partners"
                onClick={() => setActiveSection("partners")}
                fontSize="sm"
                color={activeSection === "partners" ? "green.600" : textColor}
                opacity={activeSection === "partners" ? 1 : 0.9}
                py={2}
                px={2}
                borderRadius="md"
                borderBottomWidth={2}
                borderColor={activeSection === "partners" ? "green.600" : "transparent"}
                bg={activeSection === "partners" ? navLinkHoverBg : "transparent"}
                _hover={{ bg: navLinkHoverBg, color: "green.600", opacity: 1 }}
                transition="background 0.2s, color 0.2s, border-color 0.2s"
              >
                {t("nav.partners")}
              </Link>
              <Link
                href="#contact"
                onClick={() => setActiveSection("contact")}
                fontSize="sm"
                color={activeSection === "contact" ? "green.600" : textColor}
                opacity={activeSection === "contact" ? 1 : 0.9}
                py={2}
                px={2}
                borderRadius="md"
                borderBottomWidth={2}
                borderColor={activeSection === "contact" ? "green.600" : "transparent"}
                bg={activeSection === "contact" ? navLinkHoverBg : "transparent"}
                _hover={{ bg: navLinkHoverBg, color: "green.600", opacity: 1 }}
                transition="background 0.2s, color 0.2s, border-color 0.2s"
              >
                {t("nav.contact")}
              </Link>
            </HStack>

            <HStack spacing={2}>
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                onClick={toggleColorMode}
                variant="ghost"
                color="green.600"
                size="sm"
                borderRadius="md"
                _hover={{ bg: navLinkHoverBg }}
              />
              <LanguageSwitcher />
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Spacer so content is not under fixed navbar */}
      <Box h={`${NAV_BAR_HEIGHT}px`} flexShrink={0} aria-hidden />

      {/* Hero Section - Swiper */}
      <Box id="home" position="relative" h="80vh" minH="420px" overflow="hidden">
        <Swiper
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          speed={600}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="hero-swiper"
          style={{ height: "100%", width: "100%" }}
        >
          <SwiperSlide style={{ height: "100%" }}>
            <Box position="relative" w="100%" h="100%">
              <Image src="/img/Picture1.jpg" alt="Agricultural landscape" w="100%" h="100%" objectFit="cover" />
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-b, blackAlpha.500 0%, blackAlpha.700 100%)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <VStack spacing={6} textAlign="center" color="white" px={4}>
                  <Badge colorScheme="whiteAlpha" fontSize="xs" letterSpacing="wider" textTransform="uppercase" px={3} py={1} borderRadius="full">
                    {t("hero.badge")}
                  </Badge>
                  <Heading size={{ base: "xl", md: "2xl" }} fontWeight="700" letterSpacing="tight">
                    {t("hero.title")}
                  </Heading>
                  <Text fontSize={{ base: "lg", md: "xl" }} maxW="560px" opacity={0.95}>
                    {t("hero.subtitle")}
                  </Text>
                  <Link href="#about">
                    <Button colorScheme="green" size="lg" borderRadius="xl" px={8} _hover={{ transform: "scale(1.02)" }} transition="transform 0.2s">
                      {t("hero.learnMore")}
                    </Button>
                  </Link>
                  <Text fontSize="xs" opacity={0.8} letterSpacing="wider">
                    {t("hero.trusted")}
                  </Text>
                </VStack>
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide style={{ height: "100%" }}>
            <Box position="relative" w="100%" h="100%">
              <Image src="/img/Picture1.jpg" alt="Agriculture" w="100%" h="100%" objectFit="cover" />
              <Box position="absolute" inset={0} bg="blackAlpha.600" display="flex" alignItems="center" justifyContent="center">
                <VStack spacing={6} textAlign="center" color="white" px={4}>
                  <Heading size={{ base: "xl", md: "2xl" }} fontWeight="700">{t("hero.slide2Title")}</Heading>
                  <Text fontSize={{ base: "lg", md: "xl" }} maxW="560px">{t("hero.slide2Text")}</Text>
                  <Link href="#products">
                    <Button colorScheme="green" size="lg" borderRadius="xl" px={8} _hover={{ transform: "scale(1.02)" }} transition="transform 0.2s">
                      {t("hero.ourProducts")}
                    </Button>
                  </Link>
                </VStack>
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide style={{ height: "100%" }}>
            <Box position="relative" w="100%" h="100%">
              <Image src="/img/Picture1.jpg" alt="Green fields" w="100%" h="100%" objectFit="cover" />
              <Box position="absolute" inset={0} bg="blackAlpha.600" display="flex" alignItems="center" justifyContent="center">
                <VStack spacing={6} textAlign="center" color="white" px={4}>
                  <Heading size={{ base: "xl", md: "2xl" }} fontWeight="700">{t("hero.slide3Title")}</Heading>
                  <Text fontSize={{ base: "lg", md: "xl" }} maxW="560px">{t("hero.slide3Text")}</Text>
                  <Link href="#contact">
                    <Button colorScheme="green" size="lg" borderRadius="xl" px={8} _hover={{ transform: "scale(1.02)" }} transition="transform 0.2s">
                      {t("hero.contactUs")}
                    </Button>
                  </Link>
                </VStack>
              </Box>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>

      {/* About Section */}
      <Box id="about" py={{ base: 16, md: 24 }} bg={sectionAltBg} position="relative">
        <Box position="absolute" left={0} top="20%" w="4px" h="120px" bgGradient="linear(to-b, green.400, green.600)" borderRadius="full" opacity={0.6} display={{ base: "none", md: "block" }} />
        <Container maxW="6xl">
          <VStack spacing={10} align="stretch">
            <Box>
              <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" color="green.600" textTransform="uppercase" mb={1}>
                {t("sections.aboutEyebrow")}
              </Text>
              <Heading size="xl" color="green.600" mb={2}>{t("sections.aboutTitle")}</Heading>
              <Box w="48px" h="1" bg="green.500" borderRadius="full" />
            </Box>

            <Text fontSize="lg" lineHeight="tall" maxW="4xl">
              {t.rich("about.intro", {
                b: (chunks) => (
                  <Text as="span" fontWeight="bold" color="green.600">
                    {chunks}
                  </Text>
                ),
              })}
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
              <Card {...modernCard}>
                <CardHeader pb={2}>
                  <Heading size="md" color="green.600">{t("about.productsTitle")}</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack align="start" spacing={3}>
                    <HStack align="start" spacing={3}>
                      <Icon as={FaCheck} color="green.500" mt={0.5} />
                      <Text>{t("about.product1")}</Text>
                    </HStack>
                    <HStack align="start" spacing={3}>
                      <Icon as={FaCheck} color="green.500" mt={0.5} />
                      <Text>{t("about.product2")}</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>

              <Card {...modernCard}>
                <CardHeader pb={2}>
                  <Heading size="md" color="green.600">{t("about.servicesTitle")}</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack align="start" spacing={3}>
                    <HStack align="start" spacing={3}>
                      <Icon as={FaCheck} color="green.500" mt={0.5} />
                      <Text>{t("about.service1")}</Text>
                    </HStack>
                    <HStack align="start" spacing={3}>
                      <Icon as={FaCheck} color="green.500" mt={0.5} />
                      <Text>{t("about.service2")}</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Services Section */}
      <Box id="services" position="relative" py={{ base: 16, md: 24 }} overflow="hidden">
        <Box
          position="absolute"
          inset={0}
          bgImage="url('/img/Picture1.jpg')"
          bgSize="cover"
          bgPosition="center"
          opacity={0.99}
          pointerEvents="none"
        />
        <Box position="absolute" inset={0} bg={useColorModeValue("white", "gray.900")} opacity={0.1} pointerEvents="none" />
        <Box position="relative">
          <Container maxW="6xl">
            <VStack spacing={12}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" color="green.500" textTransform="uppercase" mb={1}>
                {t("sections.servicesEyebrow")}
              </Text>
              <Heading size="xl" color="white" mb={2}>{t("sections.servicesTitle")}</Heading>
              <Box w="48px" h="1" bg="green.500" borderRadius="full" mx="auto" />
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              <Card {...modernCard} textAlign="center">
                <CardBody p={6}>
                  <VStack spacing={4}>
                    <Box p={3} borderRadius="xl" bg={useColorModeValue("green.50", "whiteAlpha.100")}>
                      <Icon as={FaLeaf} boxSize={8} color="green.500" />
                    </Box>
                    <Heading size="sm" color="green.600">{t("services.card1Title")}</Heading>
                    <Text fontSize="sm" color={textColor} opacity={0.9}>
                      {t("services.card1Text")}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>

              <Card {...modernCard} textAlign="center">
                <CardBody p={6}>
                  <VStack spacing={4}>
                    <Box p={3} borderRadius="xl" bg={useColorModeValue("green.50", "whiteAlpha.100")}>
                      <Icon as={FaWrench} boxSize={8} color="green.500" />
                    </Box>
                    <Heading size="sm" color="green.600">{t("services.card2Title")}</Heading>
                    <Text fontSize="sm" color={textColor} opacity={0.9}>
                      {t("services.card2Text")}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>

              <Card {...modernCard} textAlign="center">
                <CardBody p={6}>
                  <VStack spacing={4}>
                    <Box p={3} borderRadius="xl" bg={useColorModeValue("green.50", "whiteAlpha.100")}>
                      <Icon as={FaChartLine} boxSize={8} color="green.500" />
                    </Box>
                    <Heading size="sm" color="green.600">{t("services.card3Title")}</Heading>
                    <Text fontSize="sm" color={textColor} opacity={0.9}>
                      {t("services.card3Text")}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>

              <Card {...modernCard} textAlign="center">
                <CardBody p={6}>
                  <VStack spacing={4}>
                    <Box p={3} borderRadius="xl" bg={useColorModeValue("green.50", "whiteAlpha.100")}>
                      <Icon as={FaBuilding} boxSize={8} color="green.500" />
                    </Box>
                    <Heading size="sm" color="green.600">{t("services.card4Title")}</Heading>
                    <Text fontSize="sm" color={textColor} opacity={0.9}>
                      {t("services.card4Text")}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
          </Container>
        </Box>
      </Box>

      {/* Products Section */}
      <Box id="products" py={{ base: 16, md: 24 }} bg={sectionAltBg}>
        <Container maxW="6xl">
          <VStack spacing={12}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" color="green.600" textTransform="uppercase" mb={1}>
                {t("sections.productsEyebrow")}
              </Text>
              <Heading size="xl" color="green.600" mb={2}>{t("sections.productsTitle")}</Heading>
              <Box w="48px" h="1" bg="green.500" borderRadius="full" mx="auto" />
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={12}>
              <Card {...modernCard}>
                <CardBody p={6} textAlign="center">
                  <VStack spacing={4}>
                    <Box p={3} borderRadius="xl" bg={useColorModeValue("green.50", "whiteAlpha.100")}>
                      <Icon as={FaWifi} boxSize={8} color="green.500" />
                    </Box>
                    <Heading size="sm" color="green.600">{t("products.sensorsTitle")}</Heading>
                    <Text fontSize="sm">{t("products.sensorsText")}</Text>
                  </VStack>
                </CardBody>
              </Card>

              <Card {...modernCard}>
                <CardBody p={6} textAlign="center">
                  <VStack spacing={4}>
                    <Box p={3} borderRadius="xl" bg={useColorModeValue("green.50", "whiteAlpha.100")}>
                      <Icon as={FaCog} boxSize={8} color="green.500" />
                    </Box>
                    <Heading size="sm" color="green.600">{t("products.controllersTitle")}</Heading>
                    <Text fontSize="sm">{t("products.controllersText")}</Text>
                  </VStack>
                </CardBody>
              </Card>

              <Card {...modernCard}>
                <CardBody p={6} textAlign="center">
                  <VStack spacing={4}>
                    <Box p={3} borderRadius="xl" bg={useColorModeValue("green.50", "whiteAlpha.100")}>
                      <Icon as={FaMobile} boxSize={8} color="green.500" />
                    </Box>
                    <Heading size="sm" color="green.600">{t("products.webappTitle")}</Heading>
                    <Text fontSize="sm">{t("products.webappText")}</Text>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card {...modernCard} display="flex" flexDirection="column" overflow="hidden">
                <Image src="/img/image 5.png" alt="Agrilogy Mini" borderTopRadius="2xl" height="800px" objectFit="cover" flexShrink={0} />
                <CardBody p={6} display="flex" flexDirection="column" flex={1}>
                  <VStack align="stretch" spacing={4} flex={1}>
                    <Heading size="sm" color="green.600" textDecoration="underline" textUnderlineOffset={4} textDecorationColor="green.400">
                      {t("products.miniTitle")}
                    </Heading>
                    <Box pl={3} borderLeft="3px solid" borderColor="green.400" py={1}>
                      <Text fontSize="sm" lineHeight="tall">
                        {t("products.miniText")}
                      </Text>
                    </Box>
                    <Button colorScheme="green" variant="solid" as="a" href="#contact" borderRadius="xl" size="md" mt="auto" w="40%" alignSelf="center">
                      {t("cta.contactUs")}
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              <Card {...modernCard} display="flex" flexDirection="column" overflow="hidden">
                <Image src="/img/image 6.png" alt="Agrilogy Pro" borderTopRadius="2xl" height="520px" objectFit="cover" flexShrink={0} />
                <CardBody p={6} display="flex" flexDirection="column" flex={1}>
                  <VStack align="stretch" spacing={4} flex={1}>
                    <Heading size="sm" color="green.600" textDecoration="underline" textUnderlineOffset={4} textDecorationColor="green.400">
                      {t("products.proTitle")}
                    </Heading>
                    <Text fontSize="sm">{t("products.proIntro")}</Text>
                    <Box pl={3} borderLeft="3px solid" borderColor="green.400" py={1}>
                      <VStack align="start" spacing={2} fontSize="sm">
                        <Text><strong>{t("products.pro1Label")}</strong> {t("products.pro1Text")}</Text>
                        <Text><strong>{t("products.pro2Label")}</strong> {t("products.pro2Text")}</Text>
                        <Text><strong>{t("products.pro3Label")}</strong> {t("products.pro3Text")}</Text>
                      </VStack>
                    </Box>
                    <Button colorScheme="green" variant="solid" as="a" href="#contact" borderRadius="xl" size="md" mt="auto" w="40%" alignSelf="center">
                      {t("cta.contactUs")}
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Agrilogy Platform Section */}
      <Box id="platform" py={{ base: 16, md: 24 }} bg={bgColor}>
        <Container maxW="6xl">
          <VStack spacing={12}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" color="green.600" textTransform="uppercase" mb={1}>
                {t("sections.platformEyebrow")}
              </Text>
              <Heading size="xl" color="green.600" mb={2}>{t("sections.platformTitle")}</Heading>
              <Box w="48px" h="1" bg="green.500" borderRadius="full" mx="auto" />
            </Box>

            <Text fontSize="lg" textAlign="center" maxW="4xl" color={textColor} opacity={0.9}>
              {t("platform.intro")}
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card {...modernCard}>
                <CardHeader pb={2}>
                  <Heading size="md" color="green.600">{t("platform.keyFeaturesTitle")}</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack align="start" spacing={3}>
                    <HStack align="start" spacing={3}><Icon as={FaChartLine} color="green.500" mt={0.5} /><Text fontSize="sm">{t("platform.feature1")}</Text></HStack>
                    <HStack align="start" spacing={3}><Icon as={FaWater} color="green.500" mt={0.5} /><Text fontSize="sm">{t("platform.feature2")}</Text></HStack>
                    <HStack align="start" spacing={3}><Icon as={FaBell} color="green.500" mt={0.5} /><Text fontSize="sm">{t("platform.feature3")}</Text></HStack>
                    <HStack align="start" spacing={3}><Icon as={FaCog} color="green.500" mt={0.5} /><Text fontSize="sm">{t("platform.feature4")}</Text></HStack>
                  </VStack>
                </CardBody>
              </Card>

              <Card {...modernCard}>
                <CardHeader pb={2}>
                  <Heading size="md" color="green.600">{t("platform.benefitsTitle")}</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack align="start" spacing={3}>
                    <Text fontSize="sm">{t.rich("platform.benefit1", { b: (chunks) => <strong>{chunks}</strong> })}</Text>
                    <Text fontSize="sm">{t.rich("platform.benefit2", { b: (chunks) => <Text as="span" color="green.600" fontWeight="semibold">{chunks}</Text> })}</Text>

                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
            <Box w="100%" display="flex" justifyContent="center" >
              <Button
                as="a"
                href="#contact"
                colorScheme="green"
                variant="solid"
                size="lg"
                borderRadius="xl"
                px={8}
              >
                {t("cta.bookDemo")}
              </Button>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Platform features & dashboard section */}
      <Box id="platform-features" p={2} py={{ base: 20, md: 28 }} px={{ base: 4, md: 8 }} bg={bgColor} w="100%">
        <Box w="60%" h="1px" bgGradient="linear(to-r, transparent, green.400, transparent)" mx="auto" mb={6} flexShrink={0} opacity={0.7} />
        <Box textAlign="center" mb={6}>
          <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" color="green.600" textTransform="uppercase" mb={1}>
            {t("sections.capabilitiesEyebrow")}
          </Text>
        </Box>
        <Container maxW="full"  w="100%" px={{ base: 0, md: 8 }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 12, lg: 20 }}
            align={{ base: "stretch", lg: "center" }}
            justify="space-between"
            w="100%"
            
          >
            <VStack align="stretch" spacing={4} flex={1} maxW={{ lg: "420px" }} w="100%">
              {PLATFORM_FEATURES.map((feature, index) => (
                <Button
                  key={feature.key}
                  variant={activePlatformFeature === index ? "solid" : "outline"}
                  colorScheme="green"
                  size="lg"
                  justifyContent="flex-start"
                  textAlign="left"
                  whiteSpace="normal"
                  h="auto"
                  py={4}
                  px={5}
                  borderRadius="xl"
                  fontWeight="medium"
                  onClick={() => setActivePlatformFeature(index)}
                  _hover={{ bg: activePlatformFeature === index ? "green.600" : "green.50" }}
                  _dark={{ _hover: { bg: activePlatformFeature === index ? "green.600" : "whiteAlpha.100" } }}
                >
                  {t(`platformFeatures.${feature.key}Label`)}
                </Button>
              ))}
            </VStack>

            <Box flex={1}  p={2} display="flex" flexDirection="column" alignItems="center" w="100%" maxW={{ lg: "800px" }}>
              <Box
                h={{ base: "420px", md: "560px" }}
                w="100%"
                flexShrink={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  key={activePlatformFeature}
                  src={PLATFORM_FEATURES[activePlatformFeature].src}
                  alt={PLATFORM_FEATURES[activePlatformFeature].alt}
                  maxH="100%"
                  maxW="100%"
                  w="auto"
                  h="auto"
                  objectFit="contain"
                  transition="opacity 0.2s"
                />
              </Box>
              <Text
                fontSize="sm"
                color={textColor}
                opacity={0.85}
                textAlign="center"
                mt={6}
                maxW="480px"
                px={2}
              >
                {t(`platformFeatures.${PLATFORM_FEATURES[activePlatformFeature].key}Caption`)}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Industry 4.0 Section */}
      <Box id="industry" py={{ base: 16, md: 24 }} bg={sectionAltBg}>
        <Container maxW="6xl">
          <VStack spacing={12}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" color="green.600" textTransform="uppercase" mb={1}>
                {t("sections.industryEyebrow")}
              </Text>
              <Heading size="xl" color="green.600" mb={2}>{t("sections.industryTitle")}</Heading>
              <Box w="48px" h="1" bg="green.500" borderRadius="full" mx="auto" />
            </Box>

            <Text fontSize="lg" textAlign="center" maxW="4xl" color={textColor} opacity={0.9}>
              {t("industry.intro")}
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
              <Card {...modernCard} textAlign="center">
                <CardBody p={6}>
                  <VStack spacing={4}>
                    <Box p={3} borderRadius="xl" bg={useColorModeValue("green.50", "whiteAlpha.100")}>
                      <Icon as={FaLeaf} boxSize={8} color="green.500" />
                    </Box>
                    <Heading size="sm" color="green.600">{t("industry.studyTitle")}</Heading>
                    <Text fontSize="sm">{t("industry.studyText")}</Text>
                  </VStack>
                </CardBody>
              </Card>

              <Card {...modernCard} textAlign="center">
                <CardBody p={6}>
                  <VStack spacing={4}>
                    <Box p={3} borderRadius="xl" bg={useColorModeValue("green.50", "whiteAlpha.100")}>
                      <Icon as={FaCog} boxSize={8} color="green.500" />
                    </Box>
                    <Heading size="sm" color="green.600">{t("industry.createTitle")}</Heading>
                    <Text fontSize="sm">{t("industry.createText")}</Text>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>

            <Text fontSize="lg" textAlign="center" color="green.600" fontWeight="semibold" mb={4}>
              {t("industry.teamLine")}
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              <Card {...modernCard}>
                <CardHeader pb={2}>
                  <HStack><Icon as={FaMicrochip} color="green.500" /><Heading size="sm" color="green.600">{t("industry.electronicsTitle")}</Heading></HStack>
                </CardHeader>
                <CardBody pt={0}>
                  <List spacing={2} fontSize="sm">
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.electronics1")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.electronics2")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.electronics3")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.electronics4")}</ListItem>
                  </List>
                </CardBody>
              </Card>

              <Card {...modernCard}>
                <CardHeader pb={2}>
                  <HStack><Icon as={FaCog} color="green.500" /><Heading size="sm" color="green.600">{t("industry.automationTitle")}</Heading></HStack>
                </CardHeader>
                <CardBody pt={0}>
                  <List spacing={2} fontSize="sm">
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.automation1")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.automation2")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.automation3")}</ListItem>
                  </List>
                </CardBody>
              </Card>

              <Card {...modernCard}>
                <CardHeader pb={2}>
                  <HStack><Icon as={FaCube} color="green.500" /><Heading size="sm" color="green.600">{t("industry.design3dTitle")}</Heading></HStack>
                </CardHeader>
                <CardBody pt={0}>
                  <List spacing={2} fontSize="sm">
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.design3d1")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.design3d2")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.design3d3")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.design3d4")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.design3d5")}</ListItem>
                  </List>
                </CardBody>
              </Card>

              <Card {...modernCard}>
                <CardHeader pb={2}>
                  <HStack><Icon as={FaWrench} color="green.500" /><Heading size="sm" color="green.600">{t("industry.machiningTitle")}</Heading></HStack>
                </CardHeader>
                <CardBody pt={0}>
                  <List spacing={2} fontSize="sm">
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.machining1")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.machining2")}</ListItem>
                  </List>
                </CardBody>
              </Card>

              <Card {...modernCard}>
                <CardHeader pb={2}>
                  <HStack><Icon as={FaMobile} color="green.500" /><Heading size="sm" color="green.600">{t("industry.appDevTitle")}</Heading></HStack>
                </CardHeader>
                <CardBody pt={0}>
                  <List spacing={2} fontSize="sm">
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.appDev1")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.appDev2")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.appDev3")}</ListItem>
                    <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.appDev4")}</ListItem>
                  </List>
                </CardBody>
              </Card>

              <Card {...modernCard} gridColumn={{ base: "1", lg: "1 / -1" }}>
                <CardHeader pb={2}>
                  <HStack><Icon as={FaWifi} color="green.500" /><Heading size="sm" color="green.600">{t("industry.iotTitle")}</Heading></HStack>
                </CardHeader>
                <CardBody pt={0}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <List spacing={2} fontSize="sm">
                      <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.iot1")}</ListItem>
                      <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.iot2")}</ListItem>
                      <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.iot3")}</ListItem>
                    </List>
                    <List spacing={2} fontSize="sm">
                      <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.iot4")}</ListItem>
                      <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.iot5")}</ListItem>
                      <ListItem><ListIcon as={FaCheck} color="green.500" />{t("industry.iot6")}</ListItem>
                    </List>
                  </SimpleGrid>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Equipment Section */}
      <Box id="equipment" py={{ base: 16, md: 24 }} bg={bgColor}>
        <Container maxW="6xl">
          <VStack spacing={12}>
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" color="green.600" textTransform="uppercase" mb={1}>
                {t("sections.equipmentEyebrow")}
              </Text>
              <Heading size="xl" color="green.600" mb={2}>{t("sections.equipmentTitle")}</Heading>
              <Box w="48px" h="1" bg="green.500" borderRadius="full" mx="auto" />
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Card {...modernCard}>
                <CardBody p={6}>
                  <VStack align="start" spacing={4}>
                    <Heading size="sm" color="green.600">{t("equipment.card1Title")}</Heading>
                    <Text fontSize="sm">{t("equipment.card1Text")}</Text>
                    <Image src="/img/image 8.jpg" alt="Weather Station" borderRadius="xl" w="100%" />
                  </VStack>
                </CardBody>
              </Card>

              <Card {...modernCard}>
                <CardBody p={6}>
                  <VStack align="start" spacing={4}>
                    <Heading size="sm" color="green.600">{t("equipment.card2Title")}</Heading>
                    <Text fontSize="sm">{t("equipment.card2Text")}</Text>
                    <Text fontSize="sm">{t.rich("equipment.card2Features", { b: (chunks) => <strong>{chunks}</strong> })}</Text>
                    <Image src="/img/image 7.jpg" alt="Sensors" borderRadius="xl" w="100%" />
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Partners Section */}
      <Box id="partners" py={{ base: 16, md: 24 }} bg={partnersSectionBg} position="relative">
        <Box position="absolute" top={0} left={0} right={0} h="1px" bgGradient="linear(to-r, transparent, green.400, transparent)" opacity={0.5} />
        <Container maxW="6xl">
          <VStack spacing={12} align="stretch">
            <Box textAlign="center">
              <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" color="green.600" textTransform="uppercase" mb={1}>
                {t("sections.partnersEyebrow")}
              </Text>
              <Heading size="xl" color="green.600" mb={2}>{t("sections.partnersTitle")}</Heading>
              <Box w="48px" h="1" bg="green.500" borderRadius="full" mx="auto" />
            </Box>
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={12}
            align={{ base: "stretch", lg: "center" }}
            justify="space-between"
          >
            <Box flex={{ base: "1", lg: "1" }} minW={0} w="100%">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={2}
                breakpoints={{ 480: { slidesPerView: 3 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 3 } }}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                loop={true}
                speed={2000}
                grabCursor
                className="partners-swiper"
              >
                {PARTNERS.map((partner, i) => (
                  <SwiperSlide key={i}>
                    <Card {...modernCard} h="full" w="full">
                      <CardBody
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        minH={{ base: "400px", md: "300px" }}
                        minW={{ base: "200px", md: "200px" }}
                        p={{ base: 6, md: 1 }}
                      >
                        <Image
                          src={partner.src}
                          alt={partner.alt}
                          maxH={{ base: "96px", md: "140px" }}
                          maxW="100%"
                          objectFit="contain"
                        />
                      </CardBody>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            <VStack flex={{ base: "1", lg: "1" }} align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }} spacing={6} maxW={{ lg: "420px" }}>
              <Heading size="lg" lineHeight="tall">
                {t.rich("partners.successTitle", { b: (chunks) => <Text as="span" color="green.600">{chunks}</Text> })}
              </Heading>
              <Text color={textColor} fontSize="md" opacity={0.9}>
              {t("partners.successText")}
              </Text>
              <Button as="a" href="#contact" colorScheme="green" size="lg" borderRadius="xl" px={8} _hover={{ transform: "scale(1.02)" }} transition="transform 0.2s">
                {t("cta.contactUs")}
              </Button>
            </VStack>
          </Flex>
          </VStack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" py={{ base: 16, md: 24 }} bg={sectionAltBg}>
        <ContactSection />
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        bg={useColorModeValue("gray.100", "gray.900")}
        color={textColor}
        borderTop="2px"
        borderColor="green.500"
        py={10}
      >
        <Container maxW="6xl">
          <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} gap={4}>
            <Text fontSize="sm">
              {t.rich("footer.copyright", { b: (chunks) => <Text as="span" color="green.600" fontWeight="semibold">{chunks}</Text> })}
            </Text>
            <HStack spacing={4}>
              <Link href="https://www.facebook.com/p/Agrogo-%D8%AF%D8%B1%D8%A7%D8%B3%D8%A9-%D9%88%D8%A5%D9%86%D8%AC%D8%A7%D8%B2-%D9%85%D8%B4%D8%A7%D8%B1%D9%8A%D8%B9-%D8%A7%D9%84%D8%B3%D9%82%D9%8A-%D8%A7%D9%84%D8%B0%D9%83%D9%8A-%D9%88%D8%A7%D9%84%D8%B7%D8%A7%D9%82%D8%A9-%D8%A7%D9%84%D8%B4%D9%85%D8%B3%D9%8A%D8%A9-100092259103519/" isExternal>
                <Icon as={FaFacebook} boxSize={5} color="green.500" _hover={{ color: "green.600" }} transition="color 0.2s" />
              </Link>
              <Link href="https://www.instagram.com/agrilogy_officiel/" isExternal>
                <Icon as={FaInstagram} boxSize={5} color="green.500" _hover={{ color: "green.600" }} transition="color 0.2s" />
              </Link>
              <Link href="https://wa.me/212763938935" isExternal>
                <Icon as={FaWhatsapp} boxSize={5} color="green.500" _hover={{ color: "green.600" }} transition="color 0.2s" />
              </Link>
              <Link href="https://www.linkedin.com/company/agrilogy/" isExternal>
                <Icon as={FaLinkedin} boxSize={5} color="green.500" _hover={{ color: "green.600" }} transition="color 0.2s" />
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
