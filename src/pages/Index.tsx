import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-11-01T00:00:00').getTime();

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

  const handleRSVP = (status: 'yes' | 'no') => {
    setRsvpStatus(status);
    if (status === 'yes') {
      toast.success('Отлично! Жду тебя на празднике! 🎉');
    } else {
      toast.info('Жаль, что не сможешь прийти 😔');
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
    {
      name: 'Гантели или гири',
      description: 'Для силовых тренировок',
      icon: 'Weight',
    },
    {
      name: 'Скамья для жима',
      description: 'Для полноценной домашней качалки',
      icon: 'Activity',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-peach-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <section className="text-center mb-16 animate-fade-in">
          <div className="mb-6">
            <span className="text-6xl">🚀</span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-4">
            Андрей, ты приглашён!
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            на взлётную полосу 18-летия
          </p>
          
          <div className="mb-8 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="inline-block bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 shadow-xl">
              <p className="text-white text-sm font-medium mb-3 uppercase tracking-wider">До старта осталось:</p>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3 mb-2">
                    <div className="text-3xl md:text-4xl font-bold text-white font-heading">{timeLeft.days}</div>
                  </div>
                  <div className="text-white/90 text-xs md:text-sm font-medium">дней</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3 mb-2">
                    <div className="text-3xl md:text-4xl font-bold text-white font-heading">{timeLeft.hours}</div>
                  </div>
                  <div className="text-white/90 text-xs md:text-sm font-medium">часов</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3 mb-2">
                    <div className="text-3xl md:text-4xl font-bold text-white font-heading">{timeLeft.minutes}</div>
                  </div>
                  <div className="text-white/90 text-xs md:text-sm font-medium">минут</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3 mb-2">
                    <div className="text-3xl md:text-4xl font-bold text-white font-heading">{timeLeft.seconds}</div>
                  </div>
                  <div className="text-white/90 text-xs md:text-sm font-medium">секунд</div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-2xl mx-auto text-lg text-foreground/80 space-y-4">
            <p>
              Дорогой <span className="font-semibold">Попов Андрей Алексеевич</span>!
            </p>
            <p>
              Совсем скоро случится важное событие — моя жизнь официально переходит на новый уровень. 
              1 ноября 2025 года я отпраздную свой <span className="font-bold text-primary">18-й день рождения</span> и 
              получу права на взрослую жизнь!
            </p>
            <p>
              Я приглашаю тебя стать частью этого особенного дня. Будет очень круто, весело и по-домашнему уютно.
            </p>
          </div>
        </section>

        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Card className="bg-white/80 backdrop-blur shadow-lg border-2 border-primary/20">
            <CardContent className="p-8">
              <h2 className="font-heading text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                <Icon name="MapPin" size={32} className="text-secondary" />
                Куда и когда держим курс?
              </h2>
              <div className="space-y-4 text-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Calendar" size={24} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Дата:</span> 1 ноября 2025 года, суббота
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={24} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Время:</span> Сбор гостей в 18:00
                    <p className="text-muted-foreground text-base mt-1">
                      Так у нас будет целый вечер для общения и веселья!
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Home" size={24} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Место:</span> Квартира именинника
                    <p className="text-muted-foreground text-base mt-1">
                      Подробности о домофоне и этаже вышлю лично ближе к дате
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Shirt" size={24} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Дресс-код:</span> Комфортный и стильный. Будем фотографироваться!
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Card className="bg-white/80 backdrop-blur shadow-lg border-2 border-secondary/20">
            <CardContent className="p-8">
              <h2 className="font-heading text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                <Icon name="Sparkles" size={32} className="text-secondary" />
                Что будет на «взлётной полосе»?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
                  <span className="text-4xl">💃</span>
                  <span className="text-lg font-medium">Танцы до упада</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
                  <span className="text-4xl">🎤</span>
                  <span className="text-lg font-medium">Песни под гитару</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
                  <span className="text-4xl">😌</span>
                  <span className="text-lg font-medium">Раскумар и общение</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
                  <span className="text-4xl">🍕</span>
                  <span className="text-lg font-medium">Вкусные угощения</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg text-muted-foreground">
                  Тёплая атмосфера, отличная музыка и самые лучшие гости!
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Card className="bg-white/80 backdrop-blur shadow-lg border-2 border-primary/20">
            <CardContent className="p-8">
              <h2 className="font-heading text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                <Icon name="Gift" size={32} className="text-secondary" />
                Подарочный навигатор
              </h2>
              <p className="text-lg mb-6 text-foreground/80">
                Если хочешь сделать мне действительно полезный и желанный подарок, я составил небольшой виш-лист. 
                Не чувствуй себя обязанным строго следовать ему — любое внимание с твоей стороны будет бесценно!
              </p>
              <div className="space-y-4">
                {wishlist.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors animate-scale-in"
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    <Icon name={item.icon} size={28} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur shadow-xl border-2 border-primary">
            <CardContent className="p-8 text-center">
              <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                Важный бортовой опрос
              </h2>
              <p className="text-xl mb-8 text-foreground/80">
                Сможешь ли ты быть в моём экипаже в этот вечер?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={() => handleRSVP('yes')}
                  className={`text-lg px-8 py-6 ${
                    rsvpStatus === 'yes' ? 'bg-primary' : ''
                  }`}
                  variant={rsvpStatus === 'yes' ? 'default' : 'outline'}
                >
                  <Icon name="Check" size={24} className="mr-2" />
                  Да, я буду! Считай меня в команде!
                </Button>
                <Button
                  size="lg"
                  onClick={() => handleRSVP('no')}
                  className={`text-lg px-8 py-6 ${
                    rsvpStatus === 'no' ? 'bg-muted' : ''
                  }`}
                  variant={rsvpStatus === 'no' ? 'secondary' : 'outline'}
                >
                  <Icon name="X" size={24} className="mr-2" />
                  К сожалению, мой полёт отменяется
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-foreground/80 mb-4">
              Андрей, я очень надеюсь тебя увидеть! Этот день будет особенным, и твоё присутствие сделает его по-настоящему полным.
            </p>
            <p className="text-2xl font-heading font-semibold text-primary mt-8">
              До скорой встречи! 🚀
            </p>
            <p className="text-xl text-muted-foreground mt-2">
              Твой именинник, <span className="font-bold">Вадим</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;