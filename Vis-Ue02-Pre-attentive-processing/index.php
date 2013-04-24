<?php
include_once './design_head.php';

$testTypes = array();
$testTypes[] = "Colors";
$testTypes[] = "Shapes";
$testTypes[] = "Conjunction";
?>
<div class="page-header">
    <h1>How good is your pre-attentive processing?<br />
        <small>Choose a Test to find out</small></h1>
</div>
<div class="row" style="min-height: 400px;">
    <?php
    foreach ($testTypes as $type) :
        ?>
        <div class="span4">
            <h3><?php echo $type ?></h3>

            <div class="well test-<?= $type ?> preview">
            </div>
            <p>
                <span class="iconFont">[</span> ~ 2 Minutes
            </p>
            <p>
                <a href="./test.php?type=<?= $type ?>-TimeTrial" class="btn test">
                    Time Trial
                </a><span id="passed-<?= $type ?>-TimeTrial" class="passed iconFont"></span><br>
                <a href="./test.php?type=<?= $type ?>-ShortVisible" class="btn test">
                    Short Visible
                </a><span id="passed-<?= $type ?>-ShortVisible" class="passed iconFont"></span><br>
            </p>
            <div>
                <div class="accordion" id="<?= $type ?>-TimeTrial">
                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#<?= $type ?>-TimeTrial-collapse">
                                Show Results (Time Trial)
                            </a>
                        </div>
                        <div id="<?= $type ?>-TimeTrial-collapse" class="accordion-body collapse">
                            <div class="accordion-inner">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>
                                                Test
                                            </th>
                                            <th title="Distractor Count">
                                                <svg version="1.2" baseProfile="tiny" style="width:20px; height: 20px;">
                                                <circle cx="10" cy="10" r="10" stroke="black" stroke-width="1" fill="#336699"></circle>
                                                </svg>
                                            </th>
                                            <th title="Distractor Types">
                                                <svg version="1.2" baseProfile="tiny" style="width:30px; height: 30px;">
                                                <circle cx="10" cy="10" r="10" stroke="black" stroke-width="1" fill="#336699"></circle>
                                                <rect x="10" y="10" width="20" height="20" stroke="black" stroke-width="1" fill="#b94a48"></rect>
                                                </svg>
                                            </th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                        for ($i = 1; $i <= 7; $i++) :
                                            ?>
                                            <tr>
                                                <td>
                                                    Test <?= $i ?>
                                                </td>
                                                <td id="<?= $type ?>-<?= $i ?>-TimeTrial-distr">
                                                </td>
                                                <td id="<?= $type ?>-<?= $i ?>-TimeTrial-distrTypes" style="text-align: center">

                                                </td>
                                                <td id="<?= $type ?>-TimeTrial-<?= $i ?>" style="text-align: right">
                                                </td>
                                            </tr>
                                            <?php
                                        endfor;
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <?php
    endforeach;
    ?>
</div>
<hr />
<div class="row">
    <h2>About</h2>
    Pre-attentive processing is done parallel and within a short time under a second.<br />
    With the given tests you can find out if the tested features are pre-attentive processed by you or not.<br />

    <h3>Time Trial</h3>
    At the time trial test the reaction time of a user matters, too.<br />
    Because of this fact the limit for pre-attentive processing has been raised to 700ms instead of 500ms.


</div>

<?php
include_once './design_footer.php';
?>
<script>
    window.onload = function() {initOverviewPage();};
</script>
