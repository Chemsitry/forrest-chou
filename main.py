#To create my profile pic
import os

MIKTEX_PATH = r"<C:\Users\Forrest\AppData\Local\Programs\MiKTeX\miktex\bin\x86>"
os.environ['PATH'] = MIKTEX_PATH + os.pathsep + os.environ['PATH']

import matplotlib.pyplot as plt
from matplotlib.patches import Circle

plt.rcParams.update({
    'text.usetex': True,
    'text.latex.preamble': r'\usepackage{amsmath}',
})

#total size is size times density
size = 4
density= 64

fig = plt.figure(figsize=(size, size), dpi=density)

circle = Circle(
    (0.5, 0.5),
    0.499,
    transform=fig.transFigure,
    facecolor='white',
    edgecolor=None,
    zorder=0
)
fig.patches.append(circle)

fig.text(
    0.548, 0.614,
    r'$\varphi$',
    fontsize=size*82,
    ha='center', va='center',
    zorder=1
)

plt.axis('off')
fig.tight_layout(pad=0)

output_filename = 'varphilogo-'+str(size)+'.png'

fig.savefig(
    output_filename,
    dpi=density,
    transparent=True,
    pad_inches=0
)
plt.close(fig)
