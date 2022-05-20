import json
from types import SimpleNamespace

class Math:
    
    def avg_pol(self, songs):
        coms = []
        poss = []
        negs = []
        neus = []

        for song in songs:
            score = song.score
            data = json.loads(score, object_hook=lambda d: SimpleNamespace(**d))
            obj = data.data
            coms.append(obj.avg_com)
            poss.append(obj.avg_pos)
            negs.append(obj.avg_neg)
            neus.append(obj.avg_neu)
        
        coms_avg = round((sum(coms) / len(coms)), 2)
        poss_avg = round((sum(poss) / len(poss)), 2)
        negs_avg = round((sum(negs) / len(negs)), 2)
        neus_avg = round((sum(neus) / len(neus)), 2)

        obj = {"coms_avg": coms_avg,
        "poss_avg": poss_avg, "negs_avg": negs_avg, "neus_avg": neus_avg}

        # if json == True:
        #     data = { "data": obj
        #         }
        #     pol_score = json.dumps(data)
        #     print("got json score", pol_score)
        #     return pol_score
        data = { "data": obj }
        pol_score = json.dumps(data)
        print("got json score", pol_score)
        return pol_score
  
    def percent_dif(self, item1, item2):
        result = ((item2 - item1) / item1) * 100 
        return result

    def result_msg(self, item1, item2, subject):
        dif = self.percent_dif(item1, item2)
        if dif > 0:
            return f"{item2} is {dif}% more {subject} than {item1}"
        if dif < 0:
            return f"{item2} is {dif}% less {subject} than {item1}"
        if dif == 0:
            return f"{item1} and {item2} score exactly the same. Weird."


