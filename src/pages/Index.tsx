import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Index = () => {
  const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const targetDate = new Date('2025-11-01T10:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRSVP = (status: 'yes' | 'no') => {
    setRsvpStatus(status);
    if (status === 'yes') {
      toast.success('Отлично! Жду тебя на празднике! 🎉', {
        duration: 4000,
      });
    } else {
      toast.info('Жаль, что не сможешь прийти 😔', {
        duration: 4000,
      });
    }
  };

  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Audio playback failed:', error);
        toast.error('Не удалось воспроизвести музыку');
      }
    }
  };

  const wishlist = [
    {
      name: 'Электровелосипед CUBE',
      description: 'Для скоростных и стильных поездок по городу и за город',
      icon: 'Bike',
    },
    {
      name: 'Электросамокат Ninebot Max G3',
      description: 'Идеальный городской транспорт',
      icon: 'Zap',
    },
    {
      name: 'Спортивный комплекс для дома',
      description: 'Турник, брусья, скамья для пресса',
      icon: 'Dumbbell',
    },
  ];

  const photos = [
    { 
      url: 'https://cdn.poehali.dev/files/42ff186d-6ebe-4ab1-a7f4-56a91b8bb35e.jpg',
      caption: 'Электровелосипед CUBE - мечта любого велосипедиста!'
    },
    { 
      url: 'https://cdn.poehali.dev/files/cae10daf-1537-40e8-80ea-284d745daf20.jpg',
      caption: 'Электросамокат Ninebot Max G3 - городской транспорт будущего!'
    },
    { 
      url: 'https://cdn.poehali.dev/files/7affdae6-3e85-4be6-999e-c356f395bdd3.jpg',
      caption: 'Tesla Model X - электромобиль мечты!'
    },
    { 
      url: 'https://cdn.poehali.dev/files/9d9836bf-11dc-46e2-8eac-c3ea3a44391c.jpg',
      caption: 'Билеты на Аэрофлот - путешествия по всему миру!'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-lime-50 relative overflow-hidden">
      <audio ref={audioRef} loop>
        <source src="https://cdn.zvuk.com/api/play?id=11599718&type=mp3" type="audio/mpeg" />
      </audio>

      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + scrollY * 0.05}% ${50 + scrollY * 0.03}%, rgba(45, 212, 191, 0.1) 0%, transparent 50%)`,
        }}
      />

      <Button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 rounded-full w-14 h-14 shadow-2xl hover:scale-110 transition-transform"
        size="icon"
      >
        <Icon name={isPlaying ? 'Pause' : 'Music'} size={24} />
      </Button>

      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        <section className="text-center mb-20 animate-fade-in">
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="text-[200px] animate-pulse">🎉</div>
            </div>
            <span className="text-8xl relative z-10 inline-block animate-bounce">🚀</span>
          </div>
          <h1 className="font-heading text-6xl md:text-7xl font-bold text-primary mb-6 drop-shadow-lg">
            Ты приглашён!
          </h1>
          <p className="text-3xl text-secondary font-semibold mb-4 animate-pulse">
            на взлётную полосу 18-летия
          </p>
          
          <div className="mb-10 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="inline-block bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[gradient_3s_ease_infinite] rounded-3xl p-8 shadow-2xl">
              <p className="text-white text-base font-bold mb-4 uppercase tracking-widest">До старта осталось:</p>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="bg-white/30 backdrop-blur-lg rounded-xl p-4 mb-2 shadow-lg">
                    <div className="text-4xl md:text-5xl font-bold text-white font-heading">{timeLeft.days}</div>
                  </div>
                  <div className="text-white font-semibold text-sm md:text-base">дней</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="bg-white/30 backdrop-blur-lg rounded-xl p-4 mb-2 shadow-lg">
                    <div className="text-4xl md:text-5xl font-bold text-white font-heading">{timeLeft.hours}</div>
                  </div>
                  <div className="text-white font-semibold text-sm md:text-base">часов</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="bg-white/30 backdrop-blur-lg rounded-xl p-4 mb-2 shadow-lg">
                    <div className="text-4xl md:text-5xl font-bold text-white font-heading">{timeLeft.minutes}</div>
                  </div>
                  <div className="text-white font-semibold text-sm md:text-base">минут</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="bg-white/30 backdrop-blur-lg rounded-xl p-4 mb-2 shadow-lg">
                    <div className="text-4xl md:text-5xl font-bold text-white font-heading">{timeLeft.seconds}</div>
                  </div>
                  <div className="text-white font-semibold text-sm md:text-base">секунд</div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-xl text-foreground/90 space-y-5 leading-relaxed">
            <p className="text-2xl font-semibold">
              Дорогой <span className="text-primary font-bold">родственник</span>!
            </p>
            <p>
              Совсем скоро случится важное событие — моя жизнь официально переходит на новый уровень. 
              1 ноября 2025 года я отпраздную свой <span className="font-bold text-primary text-2xl">18-й день рождения</span> и 
              получу права на взрослую жизнь!
            </p>
            <p className="text-lg">
              Я приглашаю тебя стать частью этого особенного дня. Будет очень круто, весело и по-домашнему уютно.
            </p>
          </div>
        </section>

        <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Card className="bg-white/90 backdrop-blur-xl shadow-2xl border-2 border-primary/30 hover:shadow-primary/20 hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-10">
              <h2 className="font-heading text-4xl font-bold text-primary mb-8 flex items-center gap-4">
                <Icon name="MapPin" size={40} className="text-secondary animate-bounce" />
                Куда и когда держим курс?
              </h2>
              <div className="space-y-6 text-xl">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent/30 transition-colors">
                  <Icon name="Calendar" size={32} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-primary">Дата:</span> 1 ноября 2025 года, суббота
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent/30 transition-colors">
                  <Icon name="Clock" size={32} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-primary">Время:</span> Сбор гостей в 10:00
                    <p className="text-muted-foreground text-lg mt-2">
                      Так у нас будет целый день для общения и веселья!
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent/30 transition-colors">
                  <Icon name="Home" size={32} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-primary">Место:</span> Квартира именинника
                    <p className="text-muted-foreground text-lg mt-2">
                      Подробности о домофоне и этаже вышлю лично ближе к дате
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent/30 transition-colors">
                  <Icon name="Shirt" size={32} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-primary">Дресс-код:</span> Комфортный и стильный. Будем фотографироваться!
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="font-heading text-4xl font-bold text-center text-primary mb-10">
            Атмосфера праздника 📸
          </h2>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card className="border-4 border-primary/20 overflow-hidden shadow-2xl">
                      <CardContent className="p-0 relative aspect-video">
                        <img 
                          src={photo.url} 
                          alt={photo.caption}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                          <p className="text-white text-2xl font-semibold">{photo.caption}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </section>

        <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Card className="bg-gradient-to-br from-secondary/20 to-primary/10 backdrop-blur-xl shadow-2xl border-2 border-secondary/40">
            <CardContent className="p-10">
              <h2 className="font-heading text-4xl font-bold text-primary mb-8 flex items-center gap-4">
                <Icon name="Sparkles" size={40} className="text-secondary animate-spin" style={{ animationDuration: '3s' }} />
                Что будет на «взлётной полосе»?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center gap-6 p-6 bg-white/60 backdrop-blur rounded-2xl hover:bg-white/80 hover:scale-105 transition-all duration-300 shadow-lg">
                  <span className="text-6xl animate-bounce" style={{ animationDuration: '2s' }}>💃</span>
                  <span className="text-2xl font-bold text-primary">Танцы до упада</span>
                </div>
                <div className="flex items-center gap-6 p-6 bg-white/60 backdrop-blur rounded-2xl hover:bg-white/80 hover:scale-105 transition-all duration-300 shadow-lg">
                  <span className="text-6xl animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '0.1s' }}>🎤</span>
                  <span className="text-2xl font-bold text-primary">Песни под гитару</span>
                </div>
                <div className="flex items-center gap-6 p-6 bg-white/60 backdrop-blur rounded-2xl hover:bg-white/80 hover:scale-105 transition-all duration-300 shadow-lg">
                  <span className="text-6xl animate-bounce" style={{ animationDuration: '2.4s', animationDelay: '0.2s' }}>😌</span>
                  <span className="text-2xl font-bold text-primary">Раскумар и общение</span>
                </div>
                <div className="flex items-center gap-6 p-6 bg-white/60 backdrop-blur rounded-2xl hover:bg-white/80 hover:scale-105 transition-all duration-300 shadow-lg">
                  <span className="text-6xl animate-bounce" style={{ animationDuration: '2.6s', animationDelay: '0.3s' }}>🍕</span>
                  <span className="text-2xl font-bold text-primary">Вкусные угощения</span>
                </div>
              </div>
              <div className="mt-10 text-center">
                <p className="text-2xl text-primary font-semibold">
                  Тёплая атмосфера, отличная музыка и самые лучшие гости!
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Card className="bg-white/90 backdrop-blur-xl shadow-2xl border-2 border-primary/30">
            <CardContent className="p-10">
              <h2 className="font-heading text-4xl font-bold text-primary mb-8 flex items-center gap-4">
                <Icon name="Gift" size={40} className="text-secondary animate-pulse" />
                Подарочный навигатор
              </h2>
              <p className="text-xl mb-8 text-foreground/90 leading-relaxed">
                Если хочешь сделать мне действительно полезный и желанный подарок, я составил небольшой виш-лист. 
                Не чувствуй себя обязанным строго следовать ему — любое внимание с твоей стороны будет бесценно!
              </p>
              <div className="space-y-6">
                {wishlist.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-6 p-6 bg-gradient-to-r from-accent/40 to-accent/20 rounded-2xl hover:from-accent/60 hover:to-accent/40 hover:scale-105 transition-all duration-300 animate-scale-in shadow-lg"
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    <Icon name={item.icon} size={36} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-2xl text-primary mb-2">{item.name}</h3>
                      <p className="text-lg text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-xl shadow-3xl border-4 border-primary hover:scale-105 transition-transform duration-300">
            <CardContent className="p-12 text-center">
              <h2 className="font-heading text-4xl font-bold text-primary mb-6 flex items-center justify-center gap-4">
                <Icon name="Users" size={40} className="animate-pulse" />
                Важный бортовой опрос
              </h2>
              <p className="text-2xl mb-10 text-foreground/90 font-semibold">
                Сможешь ли ты быть в моём экипаже в этот вечер?
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  onClick={() => handleRSVP('yes')}
                  className={`text-lg px-8 py-6 rounded-2xl font-bold hover:scale-110 transition-all duration-300 shadow-2xl ${
                    rsvpStatus === 'yes' ? 'bg-primary scale-110 shadow-primary/50' : ''
                  }`}
                  variant={rsvpStatus === 'yes' ? 'default' : 'outline'}
                >
                  <Icon name="Check" size={24} className="mr-2" />
                  <span className="break-words">Да, я буду! Считай меня в команде!</span>
                </Button>
                <Button
                  size="lg"
                  onClick={() => handleRSVP('no')}
                  className={`text-lg px-8 py-6 rounded-2xl font-bold hover:scale-110 transition-all duration-300 shadow-2xl ${
                    rsvpStatus === 'no' ? 'bg-muted scale-110' : ''
                  }`}
                  variant={rsvpStatus === 'no' ? 'secondary' : 'outline'}
                >
                  <Icon name="X" size={24} className="mr-2" />
                  <span className="break-words">К сожалению, мой полёт отменяется</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center animate-fade-in pb-12" style={{ animationDelay: '1s' }}>
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur rounded-3xl p-10 shadow-2xl">
            <p className="text-2xl text-foreground/90 mb-6 leading-relaxed">
              Я очень надеюсь тебя увидеть! Этот день будет особенным, и твоё присутствие сделает его по-настоящему полным.
            </p>
            <p className="text-4xl font-heading font-bold text-primary mt-10 mb-4">
              До скорой встречи! 🚀
            </p>
            <p className="text-2xl text-muted-foreground mt-4">
              Твой именинник, <span className="font-bold text-primary">Вадим</span>
            </p>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Index;