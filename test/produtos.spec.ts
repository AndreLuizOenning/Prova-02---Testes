import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';

const productSchema = {
  type: 'object',
  required: ['id', 'title', 'price', 'description', 'category'],
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    price: { type: 'number' },
    description: { type: 'string' },
    category: { type: 'string' },
  }
};

describe('Produtos', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://fakestoreapi.com';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('produtos', () => {
      let productId: number;
      it('Valida estrutura', async () => {
        await p.spec()
          .get(`${baseUrl}/products`)
          .expectStatus(200)
          .expectJsonSchema({
            type: 'array',
            items: productSchema
          });
      });
      it('Novo produto', async () => {
        const res = await p.spec()
          .post(`${baseUrl}/products`)
          .withJson({
            title: 'Produto Avançado',
            price: 149.99,
            description: 'Produto para testes avançados',
            image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXFxgXGBgYGBgdGBcdFx0YGhgZGBceHyggGBolGxgZITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGi0lICYtLS0tLS4tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBKwMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAFAgMEBgABBwj/xABIEAACAQIEAwYCCAMFBgQHAAABAhEAAwQSITEFQVEGEyJhcYEykQcUI0KhscHwUrPhNWJy0fEVFoKSorIzQ8LSFyQlNFNzg//EABkBAAMBAQEAAAAAAAAAAAAAAAECAwAEBf/EACwRAAICAgIBAwMDBAMAAAAAAAABAhEDIRIxQQQTUSJhoXHR8IGxweEjMpH/2gAMAwEAAhEDEQA/AOYcIYxcZiSfCNf+L+lT7CWyD3oOUSRHWIHtrQ3BXAvhYxPy0pOOxYjKOdRr6jptLHRdey/EriYM20RnyswZUMOcxJBB5RmB9qfbit4Wbga3dtINT3xJZiZ6knl1qn8C4y9i5mUBlIhkOzD1Gx86e7Q8eN0BFQW15gEkt0kn971N43yHjkXCwRYX4fl6UYw2NaMudgomADoNSfzY/M0FFyPaKl4NsxgDc/6D510o5uUkqvRYLuKJtsWYl20BMkwNSSfQRTeL4kLlgPcBzpCTHx6GD1GgOu35Uq/hTadRdtmPCcpMZ1G8MJ0JnUT+Fb4lbwptlrXfK4OiuVZSD/eABEa7jpWnFSLy9S1UV4VAjh4JYk6HkelSLeMYfaFQSsmCAVYbkMp0iJ+dN27gE+fT9+lSLGDZwFXb+JtF9zW4p0b1GZe3FL72XPhXZ1e6xGJsrFq9hS6qfitkQxtkGRy0JB09NTvBbdmzZFtd/ibmzk7sTzP6AChXEu1x/wDt8MgORQvhl1AA5HQeWvSq1cGJg3C2UEzE7c+Rgeg02qM4SkSx8X/2LjjOKAEgpI21GuvKNtfOaB4rgvD3bN3eUQdiyifZgBVUxnHr42eZ0n8qbwjXrpXO5VXmG30GhMb76UIwkhpRxlu/3ewAyxMEiPtNToWIAn4oU/KrRh8LhraD7NWGjeKG15GW51zPIAFZhsp5kMxJOxnTwnUmNOWtWXguFxGJMW2ISN2y6ABcx8QbQZh1OooTx5H0x4vDFfVYjFYl7ee7YQjvXICwMzASZKjlowG+0jlQ3F8PxM20eywn7NCUyhi08yYDSZ3FWK9wa1mLYXEp3rHKo3WFIBynoOsHXT0J2sYLFpExOJS9cN62c0jLbAKNBYbQFJ1116CrR0qJS2UvFo2Av2nZCjFSG8wfQkGCB+Na7QdsS8C3lLEfdGg/rVz7QXMPeDXXZG7gsbJVh45RZEcyHnaYhfSqRxfs1dfEhUK27jKpWSVzEZ5II2MJPudaSWOMnbHx5XGLUQfwjjWIw7loOcnU5VY/Ig1bcH9IV6ASEfXUlYP/AEkQfahOMe9bizirWW7ELcOneLpMMNJ2E60I4phMi20K5LgDFiNzmbw7aHQfjVEkTlb7Z0TAduUuGGtEMNQEMkgTJgxtHU0Q/wBtJdY90M2YQSZXKNNDpm112gGN65phcGxVO9YKpXwtqPvNmGYDQxm0Mz5aVlvG3IuJbLgBwTBlAg5w3iA0BmY9K0o2tAi6ezoHHL+KZCbOIFoCJAtKSdgAr7gTpufWhnGOICzbdmYZjImYOg1IddGIH3WEnTU1Tm4teaVVlYKdfGQLnTKJjlyoemKc3AXE81VixB6aT5VJ42+2VhPjeiJh1chng6mZiAZ6TUZUjf8ACid3FXbx1OUTl0BieQH751HsYbRmJ1Eaepj51ahZTcoqPwEuCYQMWLEBURnIzhWYAEmDBmACfaiGAATElLrLIRIEwoIEn7w169TJqBgwqm2rBz3hlkXL4lOiQT1fcHkPOpGL7JYhshhVzk6TJSGPxD57T7Uk6rbGg2mqQR4zYTFOLZEkQFZIB3AgkkjWdp310qFxXgtuznFq48WwT4o3Vsp2PhJy6f4fStYfBNYY2GW4QxgMuty28fFp8SkHXYMpnQggH8Hwlfq3dYkSWhm8UGZBAzAzoABvGlJyWOKM4PJNtoot42sis7G4zTCBiAn+I9Z/TedBi3P31q19qOz1tU73Dq2UHxABsg8wzmSZgaVXbfDbh1ysFic2U5dP7xgfjVIyUlaEcZRdGhiGVY9hpoPT3rVpGf4VJ6wNBHnt/rRzB8GsKmd7q6gFRBZtd50yjy3JnlUri3GMPlRbdkkICss555YgLpIjnI186KNJPyA1wly22ViBpDAEN577fI9RXa/oytgcNsAdbv8ANuVyO4t/Etny5AxAJiFUTp7Df0B6Gu19iOEHD4K1aLhipuaxHxXHbbXrTCNHnO88imRW3M1goAFg86Xf3/qp/KlZRlPUEaeXWmyaAbCHA+GHEPkzZRlZp9BoK1gbxtOy6GG3G8rsQd6vH0ZYa2FN1gDmzAyNFy5f/d+NZxLs9hjed8NYNwFwv/iRbVzumhBUDcwG9hpQjK3QZRcafgAWMRfxBUHPcIEAnkNTGY++5orwO73GIUk2y65gFJJiREypBX15z50Px2Lu62jcVFAE2rIyDUaqzfExB0IqPwzi64W9nFq3c2GupEfwkzDVQio29ssfaH6xeAdLCAfEXKJAPkwGZh6ltfaCJ7KplHe3TcB8Xd5oQEaT106gU9w/tTaxIYKSGEEIw1g7idjHpUpsXbuFUTMXz5ZSGgD4vCDoDIG8zPIUtNlOUI/cg3QtuAqi2o2kQDqNt9SfTlQ/HoxJMlsqmZ6EHlz1I/GjnEeD341tkAuddxGgUsZzSSAddtvWLxDC2reazfuO94rnItBVVFUx4nMeGeZPLbqVEDz/AAjnmPtkEiBJ0gamTpH6UWwFm6L1q1lW1nUKubcZwRm1BKmZ2AE/OpFnHYe1jFuhzkCnqWDGRJAEHwk660aHH8Nctr3t0G7blkui22hOm35jyncaK9MpB2rYY4R2UsjEDPbvXmGUvcfS0sKDzM3J6DMBMHan+I8dwdkXsNcOTOChylnKrBTLoGywFUR+A2qt8e7Wm46XbQZFUeHM2mZSZbJr1y+cVScRj2u3SzGSxJZjznruT7zTpNLZBzU50ukWrH8TsKlqxhjcCqzXO8ciWdQcvh/hliNh6dQzYnw5QI9zyqG6tlVjrLBQfJdfzP4Udtdm7mTvLjhEifCCzf8ATNL0UlJLsYv8YYgi5bVs3jDeJWBAC5lgxyHLrTh44Ua3ct5jlIP2hDaQVZdoykFtI0k9aE3sQFdMt0kKYkghkEzIG+WTOg59alYfhrMCFZYEwSYBjYDrOwomiy/vat8TTDKCO5AZrgB8VsrlAGaZBIYx89YqJxngyMRmUaOiWrgcstxSVADRORgTsNCNd5qrHh+ItZkW2CGSD3ZzSZPigGZ3G0aVGXHGyR/4iTbggqAdfh9UDCQYnT1pUqHey68a7LYdXt2nxZW5lgTbOU5mY7zCyT16UNTsNdzmLiZMpIuqdiOo3EydppWAXFY+ymZrS5ZU3oOe4BIAyjYamdd9qK4bsd9XBa3iryMeaQFnqU1DDyM0ksiXkyTfgqHajgX1bu80OzKSWA8B5Ag6EsRJOsajepPC+yr3rXeWhayH4GMqwKmCOvI8ztRs4z6zYFhsi4q0W7tNQlxVGuUbAFfu8inQVvhPHcOuDRGIsyzEd5ad7Z8RJgwAfnpNNYySA2N7M3rNoW1OslxBBJ0AKrr4RrrvM+1Rk7I3FthrrJYkkjO/iIjQBANW66j0FSO0/EM72hba3dA8ZCWjb+E6ZpJJ59KkcV7R2bt63fSxce6i6K8hEOpzZROYid9OXQVtm0TsJwa1hLT3nK3XQqLbMpGUhQZgnlMD/COZoWnaC0N8xbqGj9agYnD4zH3GaRlzbZ/ADABKxI5RIon/APD7Kktdlj0Gg9OdTmovtjRk/CBWP7UEHwqF89z/AFp2xxK7iGyLct22jQOxBf8AwmMs+9V3iHCWW4ULAxIB6x+tMtYZZGYEASAROo2HlRWKIVmki4cJweJuM1prIulW8UsyumkiGJKQeQ57xS+N9lcY5ARMloDMzOywI5MdmA18qA8A7Ttam25YIxBkEkjYbkzGlWzg3F7WHtXnN57slmyEMN9lCkkeU+tFR49Gc3JbZBu9gcSyhsxuDKGAVlAJJ6sYgLB0jlFQMTwq9gYLqtvNsRlbb4tdTMawCKPcV49aSxhwEW8mUD4iApQKB5HWRqdI86Yx3HMHd7h3dvsgH7tQxUHQAMCIJB9Ph6HV0/sI19xXFOEYi2gupkLJBASe81MnwgQdwSPKuh/R8b/+z7HeEhvHodwO8fII5eGNOVc3t9pkFy5msElwJCuz5gBA8JACjWIA11rqfZFz9UtDKwgMAGiYDMBPsBWTYJRSRwT/AHIxTCbfc3BvK37Z/WmbvY3HICxw7QBJhrZ/JyaiLwppgopGsQV3Akj1jlTtnhtwAlVB0gQRPnA3JFFiqPyRLGDunxIjEA5TAkT0Pyq0cJwmFto93EWlPdqqlTqWuOfujY6BtI035VB7OYt8M7EqQtxTbaZlAYlgs8hz6TVgtdm7l8WLCKhLE33MjJbX4LeaNWkZyPU0j26OmEYrHKT70vz3/wCL8gLPdu949sm0jsAFU5bamCMscz3YA03ze1WDgOAxCKy218GUEhUL55jcEa6iNNpo92b4KpuGziLayrFUB1VoWWugbMTnHijSORmi3EMPfe1YGEv27SKPtJYKQ2mbMYOs5pGms78qRRx5J6o5FxB275w8q+dswOhkmSTPrtUN8ux38o3/AMq6Rxfs3Zu5naHOaSQxBaQI8QmdI33M9aA/7nW8gbWC2WZOhgkiYg7RMbmoe+jpj6RtdgLg13LetqEz+MHLEloMkRzkSK7bdsJbN1LTJZuXUGRoAAIBGg25Ake+sVy/DWGwTrdtQG8QBbKxAYQfQ/1pjF8QuXiTcZnkljJPTTyAHp1q8GpKzjy43CVF3fin1OxeW/iVvXXHgtq7XCpII1dtQOeoG3OqZx3jTYpkdkVWVYJG7H1iQvRdYk6mootS6Fh4WIJIECCYMchBB08qjY7DPbzGNFZkMcmXf2pm6EUbIOIw8netHCgcz/nUZOJONjS0xjExvJ0HrQ5D+0/kILgCyQsyAx9Y6expFjhZX4ttN9iTBifQz6UUw2IW2okqSEbrq3i0jnMgTyy021lb72raN4rhCkAEBf4iJ3i2D/yjlWbsaMOKol4vhrnDxbRmAZboYwBBPdlRMZp0PttRHgVuQwzeIaRKKdN/EZY+y1bsRhLFjBtaZ7dtVVchdgozKQwMnckga0Ew4wYZbmW4zCGIEsq/8G5nyrnyyaWjpw4o5JPluio4vsvduXmIa2QDrDkn/tAJqfGVbLbsFbNsCFATIDG2oI9/KrGLmFViyWSrkSrH8SR90+tVbF8dbMRbcPbKgQsgfCBMESGkkz1Jo4puXZs+KMOjLzlbkW2K5WgZWmSJI8zrIO/Xyp9OHJind2JF2ZZVjKw0BKjWDOpnr61HuY1GXNLJJUjwzBtiBBkkRRDs1hUe210XDbuI8Cfhhh8JHSasyCsk8Iv4izNvDp3kOTmcEjWCQSNuepmrJibWMd0YXVClAchCgSRLb6mPKqXiuNNavvbWFz+HNurdDP8ACdv9KnYDBttnujkz3bqE+AmAlpc5ieZKwPlXJki7Z24WnHQvj+Cu2+8u2rhWSqkLIJYSNG+7OYn0mdqqd/GXA6sLjHIItsw2AEeFTIA5V0/h3BgVuG4zOtyIVkgKV2IBJM6DfeK532gwGKtkC+rutsELcglSJJ+Ll6HUVXFLVMhlaUtAi/iGZixIk7wFWfZQBSbd9gwYMQw1BkyPeiHBeDHEs6pctoVUv42IBA3iASagY3DNbYqw1EidYPKRImKtRFSTLPwDtBbs2gHLSSdFHmYk7Uev8fvAqi4dmVgCGaZIO0DT86qfA8Vatq2dAzZSVPTT+n4UYw3ae66DLlzKvhW3LXDHNkGpEcsvvXLNbtHoRg4rjL9f8hDiXBBduK5XIQjEjz01Ouv+m9c476Z89fzrp1vHtcAzyrMIbqN51/WueA2soaCGkAiPDsdR02/E1TC7Rz5o8XQNZetZbv5dAfYgEfI6UVtLbOggz7H5c623CHkSjZSRJynQcztViIe7M27DWZxALs2viJYBRtCzA6/uKK2sXhlYLZwsgzqqWxt0ky21CuFcFQXGNjOyZQCXGWSW8Kg5VkkAGKONw5lVM+UFriL4QATJkAZjB2GvSaRlUP8A19FIByoD/EyLI+dX/szilbDW2UqQc2oYEaMw3Fcx4xwqz3dlsTe7lwH8O5MkGI11Gkx1q89glsDA2had2SbsFgAT9pcnT1mikLORzPArYDqzWS4UwwZpGXWdI01J56HrV9PZ2331ooqjDwXI13CgBdTtomnLIRVFudoMOpJCFncgOq50TeTEEE+LWTmny2pnivakCUsNfCa5kZii6ggwFYkCTJDEzz5yzXwTjKSdMvOG4dhrltsQLNoh2+y7zwrkWASDB3ClhoeR51BbEYLBG/dw8lHSLtpRqrEwphoiRII8xVCfjlw2xktgZVVM+dzljTQTAkQKn9lk7xrtsBrhuWyHYSQsTlLHlzg9QKWWlY8W3Kmat8VxQt2sQ9yMhe2rA/aGVElidDKwJ8uutCsRjs2ZzqZ1JMklup58zRfiAOEsYdb1hXuHO5V9UnNImNGOXKImN6A47iPeiWFtYhcqAKIGYgx1kn8KMZWicoVLfx/guHZt2WxbRiZcFhGzBmLR7A1I4jxDUIO8yjXuvD3Y/vaqDFVfB8bBtKjGO60VxsByBI+E/wCVDuMcfuOCveEg77a+43rkeNubPVhljHCmyXiuKo10hmMSNR+npRHh+AN5stoz4mEwZyfxEdNp10zVSENWjsp2kuYXvMpkMhAB+EMdmg7kCfWuyGlR5OZuTcg5ffuEtq6wrEuyGQ9sEZWid86lWB0giOta4fjrd1LqOCSzl8335aYJAgAmOWmlCcguhr+JvEKSZIIN12j4QOR2MnlttoO/2gtq8LtoN3RMZSfFlBggkc+mvvzpcqco0h/SNRnykHcf2athEOYZiTIIGZfWNesjlNRuI2bOHtZkhrhhdoA/f6VMucTw4LXVxAIIgKM3eGfutO3zqm4/Gm42ugBMD/PzrmxqTez0vUSxxhrthvs/xpFcd9Yt3UnxZllgDuV5TJnbWjvaTEWrGNt/VAodrXhM+ANdhUYToIXN5aiqNZ3qVj8M4t27zHR5VZ3i2F28uXsa6jy+ibjsGgVnu4ib51yAFmzaeG486NvodsvtUjgvEQVNtyQ6SbbK2VtPuhuRjroYqvq+vvIprvDmnT9KWUbRTDNwdlr4xxFVsHxs125qzM+dwo2DNy8gNtar1hzp6UQ4Vw7GBlvWbYOhKw9rYyDK5p1HlOtGcZ2auXk7+zYa0Ro9pgVBI0+yn8tBrp0pI1F0UytzVgmziAYV5K9AY3q/9jsPYt57cBxcINtnQnOY/gJgjccvhNc5wWGZ3yqpLEwFjWR1HKKsODxxt2VXXMC65SfhKsSfaeVNlf0k/Tw5Tom/SRgA5Q2xmugkMiANc11lltrAGnM0E4JjMRctyrWrYU5GvOwVoEHLPxMYjYGpvazH3yBlxTFYUMue2pz6zlto05PDpmEjnuKp2CwzvdVU1edNtxrudPnWUXxphU4qVro6La7VYa14VdXIO4WNefiZpPrFN43txbeMqnTQyYHyjeqdieC3DcyKyXLzEsyIykrzbO2iKQTsDz8qa4tw97EByhzfwNmiMphiNJ1BgE8qWOJJ2h8mbmqcUSsXjct12tHKCTGUnSdwDUJ71D0JnQxWEkdatfgh7TrkloK2roHizAQBvJ29AatfZLi1hn7oOQWnKogITvlkrJk86pfDr1xHW4pyldQedHLPErGJcLdtlb0gjEWFhswjV1+8PX8N6jNI61kyOnIl8S425a7mXuioKhPvSdBJ20300NVdn0j9/vWuh9qezQxCi5aeLwG7CBcAGgb+FhtPzHTm2VlJVgQwJBB3B6GtiqtEs7d7JNirVwPtdfsgI1wtb28QDFfQkTHl8qp1u5RaxhbZwly8bgFxbiqEJgsCNYH3t/bKeoqrVqiON8JKS/PR0DjHGbn1djK65QIUHU+LYyCIU8uYoZjLF7Dut7F3Q3iBVRqxgScungUHLIAAPyqB2R4gLtm5hzbN5wAbaSF8IzAkMSNVzbdD0mpHF+CY27lLWmJChRqug1MfF5/jQxxqOy/q8sMmTljVKlr+m/yQe1XHGxTL4AAs5SAdZid/QV0n6Mv7Nset7+ddqicM7MYpgVe2Vy+JMxUqTsV0aVOxBA5GeVdO7EcJuWsFaRgAwzkiRoWd25SDvTs570cg4nhPtJAUFDqFjwmSQN+UUNu4YlXYqvg0MQTrsZG4jTy+dXHDrbYu15071co0yst5W0kLBkoFjQQCpPpWsC1srfS/JuZWKMCMrEAQZ3PwiJ69aDVGhNS/UFYa0xtkSMpOo10gHX5VeuFcStWLKratoABHeq2YXt5z+EMrayBykdYqjd99mVEDMRJ05efLeoqY1rbeHQbMJ0boSOo5Us1cWiuOUVkTl0W7tpi7bWVAz94pDSSCCDpGmxgzH933qkXASBOum8fvpSsRjC7a7Db/ADqVZ41dWy2HGU22mQRrqZ3BHPrO1LCLUaDmcZTbj0ZhLVgoC99rbyQQLRbTkQwIpl+Hu1wrazXtoZVMHT8By1qIaPcD47btWLlq5bR9CUDKTmYkfEZ0AWdonSmYqdqmwPcwrW2ZXXKy6EaGNjuNNiKMWuB3vq7YkrltKQsnQkkhdB0lhr60NxF9rztceMzkkwIGvQchGntRizxQG13d03ghGVmt3G8Skyc1pyVY766URWBs+o/ftRrgXZm9fYG4r28OPEzEEZwdhbkSxbQSNOe+hm9g+DJeuNevrKWo0OzvuJ6gDX3E1fMbxhVMsyAcs2vvl51DJl46XZbBglPfg59xXhd2/Fw5cLhLcra7yVOXqtuMzFiN+fWq2cGczBJuAEgMqt4hyIG9S+0HFHxF5nZiygkLJ5DnGwny8qsmC7XW7WDtiGN1SV7tbl1UChSqlwSysJM5RHLaKpG0gPjK9lQtjTz/AHA96J8YxiPZS0gcrbLZC5XTMQWGUDmQNZ5ChtsQB5fiacyysdPz/wBaciyLaExrEkCTsJ51PxmEuYYie7cXF0MZ1idRqNG0HsR1odbWdOtSLnD7ikjJJG8a/hvWMgnwK0964Gt27a934nAzIHEjRiNBtzIG9XmzjlQGSoLEyoZiB/hA8Ommmtc2wq3bTLdFtxBBnK4BggwT0OnsRTnEuO3rzBmbRWZlCgKFznXVQCekkk1OUOReGRRWy9nFpYZsTbH2htshIiTnIIaCCCRA1I1/KjYrizk3BJYuzHMYB8Rk6DQHXlUm5jfBGeVO+vT8taCYkyZHMU0VemI/odxJy3pQbaCPlTWHKnPmMQpK76kEaHTmC3TamMMpMDqa0DqSNp/Y+VMIo6sfweJe04e2crDYipvHuM3MT3efZFCxMywEM5MTJgbztQ51j0OxqTh+GXrhAW20GNTosEgTJ31PKTQN3oH1MwrAz6U9x3hosOibsbasxkEFiWByxyER576TAgWHymRWatHT6XN7M99eSQnhYryG1LwmI+r3iSuaJESQd9wQd9K1iFkd4vvUXENLE9aCVoPqVwnS67X6Po6ZwntFbcBi5UH+Pb/mpvtXwS3iBnTw3gNDsHHIN08jXMydI5VaOzXGCAEYzGgnpy9qhLG4fVEMJxzPjJFdyMrFWBVgYIPI+dEMPxW7bUIhVV5wol9Zl5mdh8hVw4lwyzigCTluRo4/Jh94VWcfwK9aOozKdmUSPfmD61WGVSRz5MMoOgbw7HPYurcQwyGR0PIg+REj3rr/AGd42mJvAoCA1iTJ2YNqvqJOvOuOYq2VaCCDGo5/5ip3AuLXMO4ZDB5eX+ux6gmqIk1o70WCijPCMSO6WSPvf9xrkXD+2F/FXUtZLSgmWMMfCurRJgHTc9avXYbGd9gku75nvkenfXAv4AUTKNI5M+Ca2+/hVygedJEE7TGhBjzp7F2LGUBmKMoAYZS2ozZv/T8jRD/ZtoDwWszRzZj+sVJ4tewuBIsfVkxOIhTcznwIWEhVWDJ2+YM6wHfRzp1IqnGMMlm2jI6ubhaIaWXJE5lgZZzDnOlVx3mjnafi7YkoRaW0lpSqog0UEgknTmaDYe0SQY0nep+DrjHlNJeRDLBipKYO4wBFtyOUKxnnpA1pm4wzbSJ26gedFF44RtbEAyPFtBBHLkQD66mayDNJSaXQLYGcsa9OfyrbWHiSjARMkECNSDJ0jQ/KrLhe1wRQq2PEGJXx6alGg+GTBQexNI4nxW9iBF3Io5Io851Jn00rbEk4pdgZDA2G1SLei7SDsdh7HnTLgbc+Xn5VYO1mH7jCYayDqplh1JBk/wDMT86pGFpv4OXN6lQnCHmT/suwRw7jtzD5lU+AmSvmNJB/fKo+P4pcuySTB5T+Z51Cw9lrjhEBZmMADnVxx3ZFbOCNxo71fE2shgTBEbCBr7VzvhGVvs9CMsrhxjdFNB0p5bRPOBTgvgaQIrUk7VUhbHPyqTj7Sp3JUaPbUnecw+Lf1FQbitUrh1yXSSc0gDfSB09Pyo3SYkouTTT/AI/2GGco4YSpUg+/7FScReuElwc07iB+kUU7ZYQlkugaFcrT1G3zE/I1XbQu7CRSJ8lZR/ToPntldyBO6t5gMpbxa+FU+GY2VfketBeI8Ue6IICiZIXSdgs9YAAHpWrmGb7xmmxbFGg820Rpp+3GXz5j8q22HJNKdco09KzQ2Oai7aHVcD5QPU6f19qYfTT9660xqanXznaYihQ7ypttknhPErdkzlmRuVBYET8PQTE9RoTrU/H9pLzLltDKIjNBzkRGsmBp0HvzoFYQBpmpF56aiHJ+CC6uSSZkkkk7kncnzrWUjlVl7NcZt2w9i+gaze0YkkZDGjaAmJy6jURImg2NRVuOiPnQEhW/iHI+sb+c1jbI1m9Eg7EaittY8OYajr09RSWOnnT+G1BE6Ea0stbOvAvd+h/Gjdzhbhc3lO3603w/LnAYlfPT8Zq4/WB3FskDYCfy/wAqpmKteJo6mp45uVpgyY1GnEsWF4gV0mRyM0VTiDxprVFtWG32q5cD4e9y2vdYq010/wDksjB55gEE5vltroJpZenb3EpH1saqYN4vgjdfPsYGhoW2EKb6U/j2urdfvMyXAYYTEEbbGIiI5HfnUW9eJHiYn1M/nVYxaWyWbLgyK4pp/hhXgmOS1bxFzMO9NopbA/vkAmZ3GnLaa659FqxwzD//ANf5tyuDqxPP5gV336NrbLw6wH+L7Sfe7cIHypjntUVAX0tXVGZmLOqqFAJ1OszsB1pi+/8A9fMa/aj+SKA2i5u4Vi+ctdG85gFugQ5nXy+WsUjjnFHscSu3kjOlyRIkfCF1HoYpkxJ472gt2aM8XvSBGbESI0+IzVNxGIhQPvGT5ActK22INy9mZ8pdyWbYDOfEfTU0jiWFyXXQkHKxWdvh025UjRfFNwXJd/uQo8/nS7NknyHU/pVr+j7gKXrxuXVDW7ey7hnOonyA1jzFRu2VxBimCqFOkqu09fUiJjT8aHJcuInFuLkCLRVNtT1kfh0rXf5tqh3rlPYdgBVCTRKs29QeYMg9CNiPOi17iKvbIxCd4cmVH1zL0nWNz8W/War31k0vvi0L50ynROfplkav/Zd/o84QEttiHHiclU/wgwfmwPsorPpE4vFpLK/+YMxPRQf1MfI01w/tHktoiEQng9+6J/PNVU4rxHvjaP8ABZt2zvusz+dcag5ZOTPVnP28HFef4wZmqVYvQIqPcXnSVNdJwdhDvgaVwyyWxCBZ3n5fsfOoGarF2LuKLrltwhI1/h8RjzlVHvQk9DQirL39Std2BiZAuFLYgbMxIUgb6bzVE4jZ7m49s65GZZ6wdD7jWj/F8brirefW0bTWiSJBt5FYL1MyY8zVPx+IZ2Z2OrEsYG5Jk+QpcaaFyJN/cbxOKnaoq3daRuadOHK6mKexlHWhXeGt5ppmth4rGY8QBSWY9fzrBcmtMTWANzBpWemXasVqwRwtSc9ZmpFYwrNRHhzQj6AzB1AkQRtPrQwinrNyOZg7x60GNB07LgEBwn/D+W1UvvCTPnNWXiVzJhlA0JAHzqtZalhXbK53TSJIvVjPUWa2Gq9nM4pjxuiktcpq4daxZOg1PQVrNQ6munXSvRvYnCxg7cXUuAtdIZToQ124R8gY9q8/cGVQ4d9hPoCOZ/GvRnYrApbwVlNCYYmNpZmZgPIEkUAnnzgbn6xY/wD22/8AvH6092jAOMxObk5P5foasF/sRcQrDMryI+zcgERqHt5xAPXKdNqI38PfbK+JwuDuE5V726jKTOi52y+H3Aii4MXH6rEnba/qc9ewOvLqN9J/OtOo9as3b/gvdXybeHNu0qKJW3Ftm1LMCNOYGuvhqvD4R6VoxfkbN6iE0uCSOndksMlnC2hrLL3h05uC34DT0ArlfFMb3t25c/iYn22H4RV7t9py2HXLlVkUBjyXLO6xOQgkTy0Nc8xzKXbKMqztmzAdYbmJ2qGO+Ts6M0f+OPwRppQNPXl0kDYgH5f0NMMsVYhRuafwtyCTEmNOg86jTW1asZOmSktyNaxrXSkLc0rRu0RKYm5W3tgKDOpO3l1rarILkaD8TTQagM4m6l4Igb1DpxLkVjBJ7oFRMRcJMLTBvedS+FWzcudYFZvQYQuSRIwXCTBZ9o2Gu/U1ExV5Wbc6T6VdMTYRcKxJ1G5iNh0n8aoeHtyQACxOgABJJPIdTSRd7Z0ZUoLjEUDT73LXdouU5wxLvzIP3QNoGnvNN4myyHKysh6MCD+NR2NN2Q6J1lbJWPtDcLQJgKo/Mt8hUu/wqyuaXcEaRNvRo23BYTzAoN3n7FPm7OnMnVj5+u1Omq6ISxycrUnQyVjcUkGpDWFEzcWdYiSD7jamWAjcHy10/CkLGCpNpFI8Uz68vLrUSKlWMyrIIiY12kif37VgxdDeJTKYB05e9O2LIbwkkPmjLGkc9evlRDhd6ypDXVggjUQT1kroY9JozaS1fxbOkEQpJ236+eh+VLKVIpGClJCO1GG/+WtvMFGyx1BH9PzqoOasHGOIm5hh079o9ACF94/Oq4aXCmo0xvUNOdoya2DSK2DVTnHJ1B/e9E+Aue9fKPEUfL66EDShbDT0on2Zzd+pGgAYsf4VgyTQY8HtFh4XjMJZRBbw/eXVAl31GYbsASQuvQA11/sNjblzBWncQxNzkf8A8jgfgBXPOB3bN/x2Qub7yMq5gf1nqK6x2cDDDoCdfF/3NWtglGK6KHf7Y27gKYUHvnBaWyqEAMZmLkDbUAVrC8YtFGuPiiQjKCt4rGYEFtFC88umoBGhM1ykWxMwJ686cVB0Hyq2zzmsaXR0PH9t0FsZLs3XbIJgWUGgNwiTI3gHXfTYVz/iTg3bhDZgXYggAZgSYMDQTvFIdajFqzb8jQjCvpQzfXmNJEGDy5+1RGqexqLeURU2jpg9UMhz89/Ot5NJrAtSbeGzAZSCdssgH2nf2oFURDSlYjnS7logwRqNxSCprAYmanYHB5xME67AxUEinrGJZPhMUHdaHxuKf1dBDiYItgEACYA00j8qhcNRTdthzC5hJ6Dz8qQ91mMsZpYSBm2jUUIqlQck+UrOjv2MwzoujW4YeNcuszoQRtt1G2tUXtLwg4a6UmVMldRMabj3GvOuw4a0wtJpmzW0zayJj4SSQTp168prn30i8MIuJdkQxZYywRMtBM+L72un61ODd0x8jjJWik07h3ZTKkg+VbFqnVUVYhdDl7E3HEM5I6TpVo+jC0rYl1Pxd3KnmMrAmDynT5VWEt9auf0Xx9cPXumj/mSfwrKIs8hde0PCVe3cnWbbAyATqIGsbAwdDyrhqKa9HX8OADJkERBrz5irYV3UbKzKPQEj9KEYcTLLzI4Q1ht05WCiGxju5qbYwq5JLAtO0wR5zEUypCmYmnnxScl1rXRqscW4onzXXlrygiYHtyFM4y8GhRAA5DYT58yeftTFwEx0pQWOVbsZs0txuRPzNTMBxIWlub52Bg8tiqj/AKifYVDn2rZg70GkzRm4u0RS3y6Uk089rpTZt0QWN0sCtgRSxtEVjIP9i7SC89y58Fu1cuEciBCkHqIY6elCTinIKiFU7qoAB9Tufc1NwFtvq2JdBoO5Vzt4XcnTr4kQR0NDQtagJ0PWn5jeu8/RjfZuG2CWYmb2pJJ0vXAPwrga6V3f6Lf7Mset7+ddog0cVDUuaYBpWarI85pjpNQyYJFP5qg4nQzQkVwLdC3emWM013lakmpWdnGh22fKad7onlTlsU5Rok8vwRiIrKkkA1ruK3Fh96Pkila0EqYtoDlWG2Olbiwe/EiBKdW0ehp8AchSq3ELzfBdOzvbdbFlUuW3ZlUKCADIAgak0D7T8ffGMJXIoMgEgmYIG2g0J670ImtUqxpOzPO2IFoUoIOVbitU9E+b+TKL9meMfVL3e5c3hKkc9SDp8qDzW81ChkzoeO+kZWQhLTBj1O34Vzy9rJO5JJ996VmpDGgo0M534oYasQUvKKUK1BctCQtLitVsxRoWzRpBFKJpMVg2YRSSgpeWtRWoPMRlpOU0+DSTWoHuDAjn/rRPB8IuXACgBU/edlRB5nMZ+QqFFKUAchQ4m91Bzid9LWHTCW7i3DJa86jwkgyiIeYBJM+noAkUotSaeiTkaiu6/Rd/Zlj1vfzrtcMmu5fRf/Zlj1vfzrtCSKY5Ns4XNKzVlZRRJo3mpL61lZRF6GThxS0tAbVlZW4oLyS+RdLrKyjQjZsUqaysoiMysmsrKIDRrQat1lKURqayaysoBMmsmsrKxhM1sVusoUPZo0g1lZQY0WarYrVZWGZua1FZWVhW6Mit1lZRoVtm5pJNZWUQGqysrK1GsysmtVlAwutTWVlEBqa7r9Fv9mWPW9/Ou1lZSyK4j//Z',
            category: 'eletronicos'
          })
          .expectStatus(201)
          .returns('id');
        productId = res;
      });
      it('Deleta o produto criado', async () => {
        await p.spec()
          .delete(`${baseUrl}/products/${productId}`)
          .expectStatus(200);
      });
  });

  it('Categoria', async () => {
    await p.spec()
      .get(`${baseUrl}/products/category/electronics`)
      .expectStatus(200)
      .expectJsonLike([{
        category: 'electronics'
      }]);
  });

  it('Listar categorias', async () => {
    await p.spec()
      .get(`${baseUrl}/products/categories`)
      .expectStatus(200)
      .expectJsonLike(['electronics', 'jewelery']);
  });

  it('Teste usuário', async () => {
    await p.spec()
         .post(`${baseUrl}/users`)
         .withJson({
          "email": "johndoe@example.com",
          "username": "johndoe",
          "password": "123456",
          "name": {
            "firstname": "John",
            "lastname": "Doe"
          },
          "address": {
            "city": "New York",
            "street": "5th Avenue",
            "number": 100,
            "zipcode": "10001",
            "geolocation": {
              "lat": "40.7128",
              "long": "-74.0060"
            }
          },
          "phone": "1-234-567-8900"
        })
         .expectStatus(201)
  })
  
  it('Get usuário', async () => {
    await p.spec()
      .get(`${baseUrl}/users/1`)
      .expectStatus(200)
      .expectJsonLike({
        id: 1,
        username: 'johnd'
      });
  }); 

  it('atualizar usuário', async () => {
    await p.spec()
      .put(`${baseUrl}/users/1`)
      .withJson({
        email: "janedoe@example.com",
        username: "janedoe",
        password: "newpassword123",
        name: {
          firstname: "Jane",
          lastname: "Doe"
        },
        address: {
          city: "Los Angeles",
          street: "Sunset Boulevard",
          number: 42,
          zipcode: "90001",
          geolocation: {
            lat: "34.0522",
            long: "-118.2437"
          }
        },
        phone: "1-123-456-7890"
      })
      .expectStatus(200)
      .expectJsonLike({
        email: "janedoe@example.com",
        username: "janedoe"
      });
  });

  it('deletar um usuário', async () => {
    await pactum.spec()
      .delete(`${baseUrl}/users/1`)
      .expectStatus(200)
      .expectJsonLike({
        id: 1
      });
  });

  it('Criar usuário', async () => {
    await pactum.spec()
      .post('https://fakestoreapi.com/users')
      .withJson({
        email: "janedoe@example.com",
        username: "janedoe",
        password: "mypassword123",
        name: {
          firstname: "Jane",
          lastname: "Doe"
        },
        address: {
          city: "Los Angeles",
          street: "Sunset Boulevard",
          number: 42,
          zipcode: "90001",
          geolocation: {
            lat: "34.0522",
            long: "-118.2437"
          }
        },
        phone: "1-123-456-7890"
      })
      .expectStatus(201)
      .expectJsonLike({
        id: /\d+/
      });
  });

});
